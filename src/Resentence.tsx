import React, { CSSProperties, PureComponent } from "react";
import { Transition } from "react-spring";
import { getText, KeyedToken, makeState, State, transformTo } from "./state";

interface Props {
  className?: string;
  text: string;
}

export default class Resentence extends PureComponent<Props, State> {
  public static getDerivedStateFromProps(
    props: Props,
    state: State,
  ): State | null {
    return props.text !== getText(state)
      ? transformTo(state, props.text)
      : null;
  }

  constructor(props: Props) {
    super(props);
    this.state = makeState(props.text);
  }

  public render(): JSX.Element {
    const { className, text } = this.props;
    const { tokens } = this.state;
    return (
      <div className={className} style={PARENT_STYLE}>
        <div style={GHOST_STYLE}>{text}</div>
        <Transition
          items={tokens}
          keys={getKey}
          from={{ opacity: 0, transform: "scale(0)" }}
          enter={{ opacity: 1, transform: "scale(1)" }}
          leave={{ opacity: 0, transform: "scale(0)" }}
        >
          {({ key, token }, state, i) => props => {
            const index = state === "leave" ? i : this.indexOfKey(key);
            return (
              <div style={{ ...CHILD_STYLE, ...props, marginLeft: index * 40 }}>
                {token}
              </div>
            );
          }}
        </Transition>
      </div>
    );
  }

  private indexOfKey(key: number): number {
    const { tokens } = this.state;
    for (let i = 0, length = tokens.length; i < length; i++) {
      if (tokens[i].key === key) {
        return i;
      }
    }
    throw new Error(`Key ${key} not found in token list`);
  }
}

function getKey(token: KeyedToken): number {
  return token.key;
}

const PARENT_STYLE: CSSProperties = { position: "relative" };
const GHOST_STYLE: CSSProperties = { visibility: "hidden" };
const CHILD_STYLE: CSSProperties = { position: "absolute", left: 0, top: 0 };
