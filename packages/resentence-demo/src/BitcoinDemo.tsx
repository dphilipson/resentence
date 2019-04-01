import classNames from "classnames";
import React, { memo } from "react";
import "./BitcoinDemo.scss";
import RotatingDemo from "./RotatingDemo";

interface Props {
  className?: string;
}

const PRICES = [
  "$6,440.97",
  "$10,198.60",
  "$14,112.20",
  "$10,237.30",
  "$10,385.00",
  "$7,003.06",
  "$9,251.47",
  "$7,500.70",
  "$6,411.68",
];

const INTERVAL = 1250;

const BitcoinDemo = memo(function BitcoinDemo({
  className,
}: Props): JSX.Element {
  return (
    <div className={classNames("bitcoin-demo-container", className)}>
      <RotatingDemo
        className="bitcoin-demo-readout"
        entries={PRICES}
        interval={INTERVAL}
        align="right"
      />
    </div>
  );
});
export default BitcoinDemo;
