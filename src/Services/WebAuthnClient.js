const WebAuthnClient = {
  startRegistration,
  finishRegistration,
  startAuthentication,
  finishAuthentication
};

const baseURL = "http://localhost:8080/passkey"

async function startRegistration(username, UID) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username, //"CodyTest",
        uid: UID, //"c29c0704-70db-11ed-a1eb-0242ac120002"
      }),
    };

    const response = await fetch(
      `${baseURL}/register/start`,
      requestOptions
    );
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    throw error;
  }
}

async function finishRegistration(
  requestID,
  makeCredentialResponse,
  publicKeyCredentialCreationOptions
) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        makeCredentialResponse: makeCredentialResponse,
        publicKeyCredentialCreationOptions: publicKeyCredentialCreationOptions,
        requestId: requestID,
      }),
    };

    console.log(requestOptions);

    const response = await fetch(
      `${baseURL}/register/finish`,
      requestOptions
    );
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    throw error;
  }
}

async function startAuthentication() {
  try {
    const response = await fetch(
      `${baseURL}/authenticate/start`);
    const responseJSON = await response.json();

    console.log(responseJSON);

    return responseJSON;
  } catch(error) {
    throw error;
  }
}

async function finishAuthentication(requestId, assertion, publicKeyCredentialCreationOptions) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assertionResponse: assertion,
        publicKeyCredentialRequestOptions: publicKeyCredentialCreationOptions,
        requestId: requestId,
      }),
    };
    const response = await fetch(`${baseURL}/authenticate/finish`, requestOptions);

    const responseJSON = response.json();

    console.log(responseJSON);
    return responseJSON;
  } catch(error) {
    throw error;
  }
}

export default WebAuthnClient;
