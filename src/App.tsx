import { Classes } from "@blueprintjs/core";
import React, { Component } from "react";
import "./App.scss";
import ConfirmDemo from "./ConfirmDemo";
import SeussDemo from "./SeussDemo";

class App extends Component {
  public render() {
    return (
      <div className={Classes.DARK}>
        <ConfirmDemo initialText="Try me…" />
        <SeussDemo />
      </div>
    );
  }
}

export default App;
