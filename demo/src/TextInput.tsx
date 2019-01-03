import { InputGroup } from "@blueprintjs/core";
import React, { ChangeEvent, KeyboardEvent, PureComponent } from "react";

interface Props {
  className?: string;
  value: string;
  placeholder?: string;
  onChange(value: string): void;
  onSubmit?(): void;
}

export default class TextInput extends PureComponent<Props> {
  public render(): JSX.Element {
    const { className, value, placeholder, onSubmit } = this.props;
    return (
      <InputGroup
        className={className}
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    );
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    this.props.onChange(event.currentTarget.value);

  private handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.charCode === 13 && this.props.onSubmit) {
      this.props.onSubmit();
    }
  };
}
