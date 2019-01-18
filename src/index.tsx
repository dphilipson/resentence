import React, { createRef, CSSProperties, PureComponent } from "react";
import { animated, Spring, Transition } from "react-spring";
import { KeyedToken, makeTokenState, TokenState, transformTo } from "./state";

export interface ResentenceProps {
  className?: string;
  children: string | number;
}

interface State {
  tokenState: TokenState;
  renderedText: string | undefined;
  tokenPositions: Position[];
}

interface Position {
  x: number;
  y: number;
}

export default class Resentence extends PureComponent<ResentenceProps, State> {
  private ghostRef = createRef<HTMLDivElement>();

  constructor(props: ResentenceProps) {
    super(props);
    this.state = {
      tokenState: makeTokenState(props.children + ""),
      renderedText: undefined,
      tokenPositions: [],
    };
  }

  public componentDidMount(): void {
    this.syncTokens();
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  public componentDidUpdate(): void {
    this.syncTokens();
  }

  public componentWillUnmount(): void {
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
    );
  }

  public render(): JSX.Element {
    const { className, children } = this.props;
    const { tokenState, tokenPositions } = this.state;
    return (
      <div className={className} style={PARENT_STYLE}>
        <div ref={this.ghostRef} style={GHOST_STYLE}>
          {children}
        </div>
        {tokenPositions.length > 0 && (
          <Transition
            native={true}
            items={tokenState.tokens}
            keys={getKey}
            initial={null}
            from={{ opacity: 0, transform: "scale(0)" }}
            enter={{ opacity: 1, transform: "scale(1)" }}
            leave={{ opacity: 0, transform: "scale(0)" }}
          >
            {({ key, token }) => transitionProps => {
              const index = this.indexOfKey(key);
              return (
                <Spring
                  native={true}
                  to={
                    index != null
                      ? {
                          marginLeft: tokenPositions[index].x,
                          marginTop: tokenPositions[index].y,
                        }
                      : {}
                  }
                >
                  {springProps => (
                    <animated.div
                      style={{
                        ...CHILD_STYLE,
                        ...transitionProps,
                        ...springProps,
                      }}
                    >
                      {token}
                    </animated.div>
                  )}
                </Spring>
              );
            }}
          </Transition>
        )}
      </div>
    );
  }

  private syncTokens(): void {
    const { children } = this.props;
    const { tokenState, renderedText } = this.state;
    const text = children + "";
    if (!document.hidden && text !== renderedText) {
      const tokenPositions = this.getTokenPositions();
      if (tokenPositions) {
        this.setState({
          tokenPositions,
          tokenState: transformTo(tokenState, text),
          renderedText: text,
        });
      }
    }
  }

  private indexOfKey(key: number): number | undefined {
    const { tokens } = this.state.tokenState;
    for (let i = 0, length = tokens.length; i < length; i++) {
      if (tokens[i].key === key) {
        return i;
      }
    }
    return undefined;
  }

  private getTokenPositions(): Position[] | undefined {
    const { children } = this.props;
    const div = this.ghostRef.current;
    if (!div) {
      return undefined;
    }
    return (children + "")
      .split("")
      .map((_, i) => this.getTokenPosition(div, i));
  }

  private getTokenPosition(div: HTMLDivElement, index: number): Position {
    const range = document.createRange();
    const textNode = div.childNodes[0];
    range.setStart(textNode, index);
    range.setEnd(textNode, index + 1);
    const tokenRect = range.getBoundingClientRect();
    const parentRect = div.getBoundingClientRect();
    const parentCenterX = parentRect.left + parentRect.width / 2;
    return {
      x: tokenRect.left - parentCenterX,
      y: tokenRect.top - parentRect.top,
    };
  }

  private handleVisibilityChange = (): void => {
    this.syncTokens();
  };
}

function getKey(token: KeyedToken): number {
  return token.key;
}

const PARENT_STYLE: CSSProperties = { position: "relative" };
const GHOST_STYLE: CSSProperties = { color: "transparent" };
const CHILD_STYLE: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: 0,
  pointerEvents: "none",
  userSelect: "none",
};
