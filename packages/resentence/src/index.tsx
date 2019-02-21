import PropTypes from "prop-types";
import React, { createRef, CSSProperties, PureComponent } from "react";
import { animated, Spring, SpringConfig, Transition } from "react-spring";
import { KeyedToken, makeTokenState, TokenState, transformTo } from "./state";

export interface ResentenceProps {
  className?: string;
  children?: string | number | null;
  align: "left" | "center" | "right";
  speed?: number;
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
  public static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    align: PropTypes.oneOf(["left", "center", "right"]).isRequired,
    speed: PropTypes.number,
  };

  private ghostRef = createRef<HTMLDivElement>();

  constructor(props: ResentenceProps) {
    super(props);
    this.state = {
      tokenState: makeTokenState(this.getText()),
      renderedText: undefined,
      tokenPositions: [],
    };
  }

  public componentDidMount(): void {
    this.syncTokens();
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  public componentDidUpdate(oldProps: ResentenceProps): void {
    if (
      oldProps.children !== this.props.children ||
      oldProps.align !== this.props.align
    ) {
      this.syncTokens();
    }
  }

  public componentWillUnmount(): void {
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
    );
  }

  public render(): JSX.Element {
    const { className, align, speed = 1 } = this.props;
    const { tokenState, tokenPositions } = this.state;
    const config: SpringConfig = {
      tension: speed * speed * 170,
      friction: speed * 26,
    };
    return (
      <div className={className} style={{ ...PARENT_STYLE, textAlign: align }}>
        <div ref={this.ghostRef} style={GHOST_STYLE}>
          {this.getText()}
        </div>
        {tokenPositions.length > 0 && (
          <Transition
            native={true}
            items={tokenState.tokens}
            keys={getKey}
            initial={null}
            config={config}
            from={{ opacity: 0, transform: "scale(0)" }}
            enter={{ opacity: 1, transform: "scale(1)" }}
            leave={{ opacity: 0, transform: "scale(0)" }}
          >
            {({ key, token }) => transitionProps => {
              return (
                <Spring
                  native={true}
                  config={config}
                  to={this.getPositionSpringTarget(key)}
                >
                  {springProps => (
                    <animated.div
                      style={{
                        ...CHILD_STYLE,
                        ...this.getAlignmentStyle(),
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

  private getText(): string {
    const { children } = this.props;
    return children == null ? "" : children + "";
  }

  private getPositionSpringTarget(key: number): CSSProperties {
    const { align } = this.props;
    const { tokenPositions } = this.state;
    const index = this.indexOfKey(key);
    if (index == null) {
      return {};
    } else {
      const { x, y } = tokenPositions[index];
      return {
        marginTop: y,
        ...(align === "right" ? { marginRight: -x } : { marginLeft: x }),
      };
    }
  }

  private getAlignmentStyle(): CSSProperties {
    const { align } = this.props;
    switch (align) {
      case "left":
        return { left: 0 };
      case "center":
        return { left: "50%" };
      case "right":
        return { right: 0 };
    }
  }

  private syncTokens(): void {
    const { tokenState, renderedText } = this.state;
    const text = this.getText();
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
    const div = this.ghostRef.current;
    if (!div) {
      return undefined;
    }
    // The y-position of tokens, as measured below, is slightly off from the
    // container for reasons unknown. Calibrate by treating the y-position of
    // the first character as 0.
    const tokenCount = this.getText().length;
    if (tokenCount === 0) {
      return [];
    }
    const firstPosition = this.getTokenPosition(div, 0);
    const result: Position[] = [{ ...firstPosition, y: 0 }];
    for (let i = 1; i < tokenCount; i++) {
      const { x, y } = this.getTokenPosition(div, i);
      result.push({ x, y: y - firstPosition.y });
    }
    return result;
  }

  private getTokenPosition(div: HTMLDivElement, index: number): Position {
    const range = document.createRange();
    const textNode = div.childNodes[0];
    range.setStart(textNode, index);
    range.setEnd(textNode, index + 1);
    const tokenRect = range.getBoundingClientRect();
    const parentRect = div.getBoundingClientRect();
    return {
      x: this.getTokenX(tokenRect, parentRect),
      y: tokenRect.top - parentRect.top,
    };
  }

  private getTokenX(
    token: ClientRect | DOMRect,
    parent: ClientRect | DOMRect,
  ): number {
    const { align } = this.props;
    switch (align) {
      case "left":
        return token.left - parent.left;
      case "center":
        return token.left - (parent.left + parent.width / 2);
      case "right":
        return token.right - parent.right;
    }
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
  top: 0,
  pointerEvents: "none",
  userSelect: "none",
};
