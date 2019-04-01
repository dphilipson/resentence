import PropTypes from "prop-types";
import React, {
  CSSProperties,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  animated,
  AnimatedValue,
  SpringConfig,
  useSpring,
  useTransition,
} from "react-spring";
import { KeyedToken, makeTokenState, TokenState, transformTo } from "./state";

export interface ResentenceProps {
  className?: string;
  children?: string | number | null;
  align: "left" | "center" | "right";
  speed?: number;
}

interface Position {
  x: number;
  y: number;
}

interface DisplayState {
  visibleText: string | undefined;
  tokenPositions: Position[] | undefined;
  tokenState: TokenState;
}

const Resentence = memo(function Resentence({
  className,
  children,
  align,
  speed = 1,
}: ResentenceProps): ReactElement {
  /*
   * We achieve the desired behavior by rendering each visible character in a
   * separate div, and these divs are animated to the proper positions when text
   * changes. To compute the desired coordinates for each character, we first
   * render the text to an invisible "ghost" div with the same styling, then use
   * that div to take measurements for each individual character.
   *
   * With this in mind, note that there are three values that represent the
   * text, and at a given time any of these values may disagree:
   *
   * 1. The target value of the text, passed in from the parent, which should
   *    eventually be displayed on screen.
   *
   * 2. The value of the text which is currently contained in the invisible div.
   *
   * 3. The state of the text displayed by the visible characters, or that which
   *    they are actively animating towards.
   *
   * These are represented in the code below as targetText,
   * ghostRef.current.innerText, and displayState respectively.
   */

  const targetText = children == null ? "" : children + "";
  const [
    { visibleText, tokenPositions, tokenState },
    setDisplayState,
  ] = useState<DisplayState>({
    visibleText: undefined,
    tokenPositions: undefined,
    tokenState: makeTokenState(targetText),
  });
  const ghostRef = useRef<HTMLDivElement | null>(null);

  const getTokenX = useCallback(
    (token: ClientRect | DOMRect, parent: ClientRect | DOMRect): number => {
      switch (align) {
        case "left":
          return token.left - parent.left;
        case "center":
          return token.left - (parent.left + parent.width / 2);
        case "right":
          return token.right - parent.right;
      }
    },
    [align],
  );

  const getTokenPosition = useCallback(
    (div: HTMLDivElement, index: number): Position => {
      const range = document.createRange();
      const textNode = div.childNodes[0];
      range.setStart(textNode, index);
      range.setEnd(textNode, index + 1);
      const tokenRect = range.getBoundingClientRect();
      const parentRect = div.getBoundingClientRect();
      return {
        x: getTokenX(tokenRect, parentRect),
        y: tokenRect.top - parentRect.top,
      };
    },
    [getTokenX],
  );

  const getTokenPositions = useCallback((): Position[] | undefined => {
    const div = ghostRef.current;
    if (!div) {
      return undefined;
    }
    // The y-position of tokens, as measured below, is slightly off from the
    // container for reasons unknown. Calibrate by treating the y-position of
    // the first character as 0.
    const tokenCount = div.innerText.length;
    if (tokenCount === 0) {
      return [];
    }
    const firstPosition = getTokenPosition(div, 0);
    const result: Position[] = [{ ...firstPosition, y: 0 }];
    for (let i = 1; i < tokenCount; i++) {
      const { x, y } = getTokenPosition(div, i);
      result.push({ x, y: y - firstPosition.y });
    }
    return result;
  }, [getTokenPosition]);

  const syncTokens = useCallback((): void => {
    if (document.hidden) {
      return;
    }
    const ghostText = ghostRef.current && ghostRef.current.innerText;
    if (ghostText == null || ghostText === visibleText) {
      return;
    }
    const newTokenPositions = getTokenPositions();
    if (!newTokenPositions) {
      return;
    }
    setDisplayState(oldState => ({
      visibleText: ghostText,
      tokenPositions: newTokenPositions,
      tokenState: transformTo(oldState.tokenState, ghostText),
    }));
  }, [visibleText, getTokenPositions]);

  useEffect(() => {
    syncTokens();
  });

  useEffect(() => {
    document.addEventListener("visibilitychange", syncTokens);
    return () => document.removeEventListener("visibilitychange", syncTokens);
  }, [syncTokens]);

  const springConfig: SpringConfig = useMemo(
    () => ({
      tension: speed * speed * 170,
      friction: speed * 26,
    }),
    [speed],
  );

  const transitions = useTransition(tokenState.tokens, getKey, {
    initial: null,
    config: springConfig,
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
  });

  return (
    <div className={className} style={{ ...PARENT_STYLE, textAlign: align }}>
      <div ref={ghostRef} style={GHOST_STYLE}>
        {targetText}
      </div>
      {tokenPositions &&
        transitions.map(({ item, props }) => (
          <Token
            key={item.key}
            align={align}
            springConfig={springConfig}
            springTarget={getPositionSpringTarget(item.key)}
            token={item.token}
            transitionProps={props}
          />
        ))}
    </div>
  );

  function getPositionSpringTarget(key: number): CSSProperties {
    if (!tokenPositions) {
      return {};
    }
    const index = indexOfKey(key);
    if (index == null) {
      return {};
    }
    const { x, y } = tokenPositions[index];
    return {
      marginTop: y,
      ...(align === "right" ? { marginRight: -x } : { marginLeft: x }),
    };
  }

  function indexOfKey(key: number): number | undefined {
    const { tokens } = tokenState;
    for (let i = 0, length = tokens.length; i < length; i++) {
      if (tokens[i].key === key) {
        return i;
      }
    }
    return undefined;
  }
});

(Resentence as any).propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  align: PropTypes.oneOf(["left", "center", "right"]).isRequired,
  speed: PropTypes.number,
};

interface TokenProps {
  align: ResentenceProps["align"];
  springConfig: SpringConfig;
  springTarget: CSSProperties;
  token: string;
  transitionProps: AnimatedValue<CSSProperties>;
}

function Token({
  align,
  springConfig,
  springTarget,
  token,
  transitionProps,
}: TokenProps): ReactElement {
  const springProps = useSpring({ config: springConfig, to: springTarget });

  return (
    <animated.div
      style={{
        ...CHILD_STYLE,
        ...getAlignmentStyle(),
        ...transitionProps,
        ...springProps,
      }}
    >
      {token}
    </animated.div>
  );

  function getAlignmentStyle(): CSSProperties {
    switch (align) {
      case "left":
        return { left: 0 };
      case "center":
        return { left: "50%" };
      case "right":
        return { right: 0 };
    }
  }
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

export default Resentence;
