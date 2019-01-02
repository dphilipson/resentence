import React, { PureComponent } from "react";

interface Props {
  className?: string;
  text: string;
}

export default class Resentence extends PureComponent<Props> {
  public render(): JSX.Element {
    return <p className={this.props.className}>{this.props.text}</p>;
  }
}
