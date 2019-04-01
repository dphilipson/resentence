import { InputGroup } from "@blueprintjs/core";
import React, {
  ChangeEvent,
  KeyboardEvent,
  memo,
  ReactElement,
  useCallback,
} from "react";

interface Props {
  className?: string;
  value: string;
  placeholder?: string;
  onChange(value: string): void;
  onSubmit?(): void;
}

const TextInput = memo(function TextInput({
  className,
  value,
  placeholder,
  onChange,
  onSubmit,
}: Props): ReactElement {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void =>
      onChange(event.currentTarget.value),
    [onChange],
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>): void => {
      if (event.charCode === 13 && onSubmit) {
        onSubmit();
      }
    },
    [onSubmit],
  );

  return (
    <InputGroup
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
});
export default TextInput;
