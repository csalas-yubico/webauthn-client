import { get } from "@github/webauthn-json";
import WebAuthnClient from "../Services/WebAuthnClient";

import { Alert, Button } from "react-bootstrap";

import { Stack } from "react-bootstrap";

import { useState } from "react";

const Authenticate = function () {
  const [getOptions, setGetOptions] = useState({});
  const [alert, setAlert] = useState("Nothing to report :)");
  const [alertType, setAlertType] = useState("primary");

  const handleAuthentication = async () => {
    try {
      setAlert("Auth started");
      const authOptions = await WebAuthnClient.startAuthentication("");

      setGetOptions(authOptions);
      setAlert("Auth request received");

      const assertion = await get(authOptions);

      console.log(assertion);
      setAlert("Assertion created");

      const finishAuth = await WebAuthnClient.finishAuthentication(
        authOptions.requestId,
        assertion,
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


  return (
    <Stack gap={5}>
      <div>
        <h1>Authenticate control</h1>
        <Button onClick={handleAuthentication} variant="primary" size="lg">
          Click here to begin authentication
        </Button>
      </div>
      <div>
        <h3>Status</h3>
        <Alert variant={alertType}>{alert}</Alert>
      </div>
    </Stack>
  );
};

export default Authenticate;
