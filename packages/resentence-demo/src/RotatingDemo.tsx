import classNames from "classnames";
import React, { PureComponent } from "react";
import Resentence from "resentence";

interface Props {
  className?: string;
  entries: string[];
  interval: number;
  align: "left" | "center" | "right";
}

interface State {
  index: number;
}

export default class RotatingDemo extends PureComponent<Props, State> {
  public readonly state: State = { index: 0 };
  private intervalId: number | undefined;

  public componentDidMount(): void {
    this.restartInterval();
  }

  public componentDidUpdate(oldProps: Props): void {
    if (oldProps.interval !== this.props.interval) {
      this.restartInterval();
    }
  }

  public componentWillUnmount(): void {
    window.clearInterval(this.intervalId);
  }

  public render(): JSX.Element | null {
    const { className, entries, align } = this.props;
    const { index } = this.state;
    if (entries.length === 0) {
      return null;
    }
    return (
      <Resentence
        className={classNames("demo-readout", className)}
        align={align}
      >
        {entries[index % entries.length]}
      </Resentence>
    );
  }

  private restartInterval(): void {
    const { entries, interval } = this.props;
    window.clearInterval(this.intervalId);
    this.intervalId = window.setInterval(
      () =>
        this.setState(({ index }) => ({ index: (index + 1) % entries.length })),
      interval,
    );
  }
}
