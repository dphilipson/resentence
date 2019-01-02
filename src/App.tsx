import React, { Component } from "react";
import "./App.scss";
import { getEdits } from "./editDistance";
import { makeState, transformTo } from "./state";

class App extends Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

(window as any).getEdits = getEdits;
(window as any).makeState = makeState;
(window as any).transformTo = transformTo;
