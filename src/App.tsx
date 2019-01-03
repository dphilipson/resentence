import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import React, { Component } from "react";
import "./App.scss";
import BitcoinDemo from "./BitcoinDemo";
import ConfirmDemo from "./ConfirmDemo";
import SeussDemo from "./SeussDemo";

class App extends Component {
  public render() {
    return (
      <div className={classNames(Classes.DARK, "app")}>
        <h1 className="app-title">Resentence</h1>
        <p className="app-explanation">
          Easy-to-use React component for morphing one string into another.
        </p>
        <SeussDemo className="app-seuss-demo" />
        <h3 className="app-section-header">
          Smoothly transition text in any style
        </h3>
        <p className="app-section-body">
          Use ordinary CSS to layout and style your text however you want, then
          wrap it in a Resentence component to animate its changes. Note the
          right-alignment in the following example, which works well for
          displaying numbers.
        </p>
        <BitcoinDemo className="app-bitcoin-demo" />
        <p className="app-bitcoin-explanation">
          Monthly Bitcoin prices, July 2017—December 2018
        </p>
        <h3 className="app-section-header">Display updates intuitively</h3>
        <p className="app-section-body">
          Resentence will find the transformation from one string to the next
          which uses the fewest edits (as defined by{" "}
          <a
            href="https://en.wikipedia.org/wiki/Levenshtein_distance"
            target="_blank"
          >
            Levenschtein distance
          </a>
          ), then animate those edits in a visually intuitive way. You can
          experiment with different edit types using the interactive demo below.
        </p>
        <ConfirmDemo className="app-confirm-demo" initialText="Edit me…" />
        <p className="app-section-body app-copyright">
          Copyright © 2019 David Philipson
        </p>
      </div>
    );
  }
}

export default App;
