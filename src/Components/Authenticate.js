import { get } from "@github/webauthn-json";
import WebAuthnClient from "../Services/WebAuthnClient";

import { Alert, Button } from "react-bootstrap";

import { Stack } from "react-bootstrap";

import ReactJson from "react-json-view";

import { useState } from "react";

const Authenticate = function () {
  const [getOptions, setGetOptions] = useState({});
  const [alert, setAlert] = useState("Nothing to report :)");
  const [alertType, setAlertType] = useState("primary");

  const handleAuthentication = async () => {
    try {
      setAlert("Auth started");
      const authOptions = await WebAuthnClient.startAuthentication();

      setGetOptions(authOptions);
      setAlert("Auth request received");

      const assertion = await get(JSON.parse(authOptions.publicKey));

      console.log(assertion);
      setAlert("Assertion created");

      const finishAuth = await WebAuthnClient.finishAuthentication(
        authOptions.requestId,
        assertion,
        authOptions.publicKeyCredentialRequestOptions
      );
      console.log(finishAuth);

      if (finishAuth.success === true) {
        setAlertType("success");
        setAlert("Auth was successful");
      } else {
        setAlertType("danger");
        setAlert("Auth was rejected");
      }
    } catch (error) {
      console.error(error.message);
      setAlertType("danger");
      setAlert("Authentication failed");
    }
  };

  //let abortController;

  const [abortController, setAbortController] = useState(new AbortController());

  const start = function (thisAbortController) {
    //abortController = new AbortController();
    //setAbortController(new AbortController());
    // setTimeout(() => abortController.abort(), 5000); // automatically abort after 5 seconds
    
    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);
    
    navigator.credentials
      .get({
        publicKey: {
          authenticatorSelection: { authenticatorAttachment: "platform" },
          timeout: 4000,
          challenge: challenge.buffer,
        },
        signal: thisAbortController.signal,
        mediation: "conditional", // use autofill instead of the modal webauthn dialog
      })
      .then((assertion) => {
        console.log("Credential ID: ", assertion.id);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          console.log("canceled credentials.get() request");
        } else {
          console.error("other error: " + error);
        }
      });
  }

  const abort = function () {
    abortController.abort(); // will cause the promise object returned by credentials.get() to reject with an DOMException named `AbortError`
    setAbortController(new AbortController());
  }

  return (
    <Stack gap={5}>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" autoComplete="username webauthn" />
        <button id="start" onClick={() => start(abortController)}>
          start
        </button>
        <button id="abort" onClick={abort}>
          abort
        </button>
      </div>
      <div>
        <h1>Authenticate control</h1>
        <Button onClick={handleAuthentication} variant="primary" size="lg">
          Click here to begin authentication
        </Button>
      </div>
      <div>
        <h3>Auth Options:</h3>
        <ReactJson src={getOptions} collapsed={true} />
      </div>
      <div>
        <h3>Status</h3>
        <Alert variant={alertType}>{alert}</Alert>
      </div>
    </Stack>
  );
};

export default Authenticate;
