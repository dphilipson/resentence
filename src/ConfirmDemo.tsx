import { Button, Classes, ControlGroup, Intent } from "@blueprintjs/core";
import classNames from "classnames";
import React, { PureComponent } from "react";
import "./ConfirmDemo.scss";
import Resentence from "./Resentence";
import TextInput from "./TextInput";

interface Props {
  className?: string;
}

interface State {
  text: string;
  inputText: string;
}

const INITIAL_TEXT = "Hello, World!";

export default class ConfirmDemo extends PureComponent<Props, State> {
  public readonly state: State = { text: INITIAL_TEXT, inputText: "" };

  public render(): JSX.Element {
    const { className } = this.props;
    const { text, inputText } = this.state;
    return (
      <div className={classNames("confirm-demo", className)}>
        <Resentence className="resentence" text={text} />
        <ControlGroup className="controls" fill={true}>
          <TextInput
            className="input"
            value={inputText}
            placeholder="Enter text and press Update…"
            onChange={this.handleInputChange}
            onSubmit={this.handleUpdate}
          />
          <Button
            className={Classes.FIXED}
            disabled={!inputText.trim()}
            text="Update"
            intent={Intent.PRIMARY}
            onClick={this.handleUpdate}
          />
        </ControlGroup>
      </div>
    );
  }

  private handleInputChange = (inputText: string): void =>
    this.setState({ inputText });

  private handleUpdate = (): void => {
    this.setState(prevState => {
      const text = prevState.inputText.trim();
      return text ? { text, inputText: text } : null;
    });
  };
}
