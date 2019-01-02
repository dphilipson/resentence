import { Classes } from "@blueprintjs/core";
import React, { Component } from "react";
import "./App.scss";
import ConfirmDemo from "./ConfirmDemo";
import { getEdits } from "./editDistance";
import { makeState, transformTo } from "./state";

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

(window as any).getEdits = getEdits;
(window as any).makeState = makeState;
(window as any).transformTo = transformTo;
