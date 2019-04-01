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
import { KeyedToken, makeTokenState, transformTo } from "./state";

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

const Resentence = memo(function Resentence({
  className,
  children,
  align,
  speed = 1,
}: ResentenceProps): ReactElement {
  const text = children == null ? "" : children + "";
  const [tokenState, setTokenState] = useState(makeTokenState(text));
  const [renderedText, setRenderedText] = useState<string | undefined>(
    undefined,
  );
  const [tokenPositions, setTokenPositions] = useState<Position[]>();
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
    const tokenCount = text.length;
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
  }, [text, getTokenPosition]);

  const syncTokens = useCallback((): void => {
    if (!document.hidden && text !== renderedText) {
      const newTokenPositions = getTokenPositions();
      if (newTokenPositions) {
        setTokenPositions(newTokenPositions);
        setTokenState(ts => transformTo(ts, text));
        setRenderedText(text);
      }
    }
  }, [text, renderedText, getTokenPositions]);

  useEffect(() => {
    syncTokens();
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
        {text}
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
