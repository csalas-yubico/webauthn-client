const WebAuthnClient = {
  startRegistration,
  finishRegistration,
  startAuthentication,
  finishAuthentication,
  getCredentials
};

const baseURL = "http://localhost:8080/v1"

async function startRegistration(username) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username, //"CodyTest",
        displayName: "username",
        attestation: "direct",
        authenticatorSelection: {
          residentKey: "preferred",
          userVerification: "preferred"
        }
      }),
    };

    const response = await fetch(
      `${baseURL}/attestation/options`,
      requestOptions
    );

    const responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function finishRegistration(
  requestID,
  makeCredentialResponse,
) {
  try {
    // Add requestId to the makeCredentialResponse
    makeCredentialResponse.requestId = requestID

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId: requestID,
        makeCredentialResult: makeCredentialResponse
      }),
    };

    console.log(requestOptions);

    const response = await fetch(
      `${baseURL}/attestation/result`,
      requestOptions
    );
    const responseJSON = await response.json();

    return responseJSON;
  } catch (error) {
    throw error;
  }
}

async function getCredentials(username) {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };

    const response = await fetch(`${baseURL}/user/credentials/${username}`, requestOptions);

    const responseJSON = await response.json();

    console.log(responseJSON);

    return responseJSON;

  } catch (error) {
    throw error;
  }
}

async function startAuthentication(username) {
  try {

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username, //"CodyTest",
      }),
    };
    
    const response = await fetch(
      `${baseURL}/assertion/options`, requestOptions);
    const responseJSON = await response.json();

    console.log(responseJSON);

    return responseJSON;
  } catch(error) {
    throw error;
  }
}

async function finishAuthentication(requestId, assertion) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assertionResult: assertion,
        requestId: requestId,
      }),
    };
    const response = await fetch(`${baseURL}/assertion/result`, requestOptions);

    const responseJSON = await response.json();

    console.log(responseJSON);
    return responseJSON;
  } catch(error) {
    throw error;
  }
}

export default WebAuthnClient;
