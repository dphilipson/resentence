import { Button, Classes, ControlGroup, Intent } from "@blueprintjs/core";
import classNames from "classnames";
import React, { PureComponent } from "react";
import Resentence from "resentence";
import "./ConfirmDemo.scss";
import TextInput from "./TextInput";

interface Props {
  className?: string;
  initialText: string;
}

interface State {
  text: string;
  inputText: string;
}

export default class ConfirmDemo extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { initialText } = props;
    this.state = { text: initialText, inputText: initialText };
  }

  public render(): JSX.Element {
    const { className } = this.props;
    const { text, inputText } = this.state;
    return (
      <div className={classNames("confirm-demo", className)}>
        <Resentence className="demo-readout" align="center">
          {text}
        </Resentence>
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
      return { text, inputText: text };
    });
  };
}
