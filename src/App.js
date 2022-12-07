import "./App.css";
import { Col, Container, Row, Stack } from "react-bootstrap";

import Authenticate from "./Components/Authenticate";
import Register from "./Components/Register";

const App = function () {

  return (
    <Container>
      <h1 className="center-text">Simple Relying Party Tester</h1>
      <Stack gap={3}>
        <div>
          <Register />
        </div>
        <hr />
        <div>
          <Authenticate />
        </div>
      </Stack>
    </Container>
  );
};

export default App;
