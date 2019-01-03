import { Classes } from "@blueprintjs/core";
import React, { Component } from "react";
import "./App.scss";
import ConfirmDemo from "./ConfirmDemo";

class App extends Component {
  public render() {
    return (
      <div className={Classes.DARK}>
        <ConfirmDemo />
      </div>
    );
  }
}

export default App;
