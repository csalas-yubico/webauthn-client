import WebAuthnClient from "../Services/WebAuthnClient";

import { Alert, Button } from "react-bootstrap";

import { Stack } from "react-bootstrap";

import { useState } from "react";

const Credentials = function () {
  const [getOptions, setGetOptions] = useState({});
  const [alert, setAlert] = useState("Nothing to report :)");
  const [alertType, setAlertType] = useState("primary");

  const handleGetCredentials = async () => {
    try {
      setAlert("Getting creds");
      const creds = await WebAuthnClient.getCredentials("NewTest");

      setAlert("List of creds received");
      setGetOptions(creds);

    } catch (error) {
      console.error(error.message);
      setAlertType("danger");
      setAlert("Authentication failed");
    }
  };

  return (
    <div>
      <Stack gap={5}>
        <div>
          <h1>Credential list</h1>
          <Button onClick={handleGetCredentials} variant="primary" size="lg">
            Click here to load your credentials
          </Button>
        </div>

        <div>
          <h3>Status</h3>
          <Alert variant={alertType}>{alert}</Alert>
        </div>
      </Stack>
    </div>
  );
};

export default Credentials;
