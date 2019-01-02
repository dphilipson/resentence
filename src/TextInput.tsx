import { InputGroup } from "@blueprintjs/core";
import React, { ChangeEvent, PureComponent } from "react";

interface Props {
  className?: string;
  value: string;
  placeholder?: string;
  onChange(value: string): void;
}

export default class TextInput extends PureComponent<Props> {
  public render(): JSX.Element {
    const { className, value, placeholder } = this.props;
    return (
      <InputGroup
        className={className}
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    this.props.onChange(event.currentTarget.value);
}
