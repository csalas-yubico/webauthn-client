import { create } from "@github/webauthn-json";
import WebAuthnClient from "../Services/WebAuthnClient";

import { Alert, Button, Stack } from "react-bootstrap";

import ReactJson from "react-json-view";
import { useState } from "react";

const Register = function () {

  const [createOptions, setCreateOptions] = useState({});
  const [makeCredResult, setMakeCredResult] = useState({});
  const [alert, setAlert] = useState("Nothing to report :)");
  const [alertType, setAlertType] = useState("primary");

  const handleRegister = async () => {
    try {
      setAlertType("primary");
      setAlert("Registration started");
      
      const regOptions = await WebAuthnClient.startRegistration(
        "CodyTest",
        "c29c0704-70db-11ed-a1eb-0242ac120002"
      );

      setAlert("Registration options received");
      setCreateOptions(regOptions);

      const makeCredential = await create(JSON.parse(regOptions.publicKey));
      setAlert("Credential created");
      setMakeCredResult(makeCredential);
      console.log(makeCredential);

      const finishReg = await WebAuthnClient.finishRegistration(
        regOptions.requestId,
        makeCredential,
        regOptions.publicKeyCredentialCreationOptions
      );

      console.log(finishReg);

      if(finishReg.credential === undefined) {
        setAlertType("success");
        setAlert("Credential registered");
      } else {
        setAlertType("dange");
        setAlert("Credential not registered");
      }
      
    } catch (error) {
      console.error(error.message);
      setAlertType("danger");
      setAlert("Error: " + error.message);
    }
  };

  return (
    <div>
      <Stack gap={5}>
        <div>
          <h1>Register control</h1>
          <Button onClick={handleRegister} variant="primary" size="lg">
            Click here to begin registration
          </Button>
        </div>
        <div>
          <h3>Create options:</h3>
          <ReactJson src={createOptions} collapsed={true} />
        </div>
        <div>
          <h3>Make credential result:</h3>
          <ReactJson src={makeCredResult} collapsed={true} />
        </div>
        <div>
          <h3>Status</h3>
          <Alert variant={alertType}>{alert}</Alert>
        </div>
      </Stack>
    </div>
  );
};

export default Register;
