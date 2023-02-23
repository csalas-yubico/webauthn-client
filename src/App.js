import "./App.css";
import { Col, Container, Row, Stack } from "react-bootstrap";

import Authenticate from "./Components/Authenticate";
import Register from "./Components/Register";
import Credentials from "./Components/Credentials";

const App = function () {

  return (
    <Container>
      <h1 className="center-text">Simple Relying Party Tester</h1>
      <Stack gap={3}>
        <div>
          <Register />
        </div>
        <div>
          <Authenticate />
        </div>
        <div>
          <Credentials />
        </div>
      </Stack>
    </Container>
  );
};

export default App;
