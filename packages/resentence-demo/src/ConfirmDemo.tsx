import { Button, Classes, ControlGroup, Intent } from "@blueprintjs/core";
import classNames from "classnames";
import React, { memo, ReactElement, useCallback, useState } from "react";
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

const ConfirmDemo = memo(function ConfirmDemo({
  className,
  initialText,
}: Props): ReactElement {
  const [{ text, inputText }, setState] = useState<State>({
    text: initialText,
    inputText: initialText,
  });

  const setInputText = useCallback(
    (newInputText: string) =>
      setState(oldState => ({ ...oldState, inputText: newInputText })),
    [],
  );

  const handleUpdate = useCallback((): void => {
    setState(oldState => {
      const newText = oldState.inputText.trim();
      return { text: newText, inputText: newText };
    });
  }, []);

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
          onChange={setInputText}
          onSubmit={handleUpdate}
        />
        <Button
          className={Classes.FIXED}
          text="Update"
          intent={Intent.PRIMARY}
          onClick={handleUpdate}
        />
      </ControlGroup>
    </div>
  );
});
export default ConfirmDemo;
