import classNames from "classnames";
import React from "react";
import "./BitcoinDemo.scss";
import RotatingDemo from "./RotatingDemo";

interface Props {
  className?: string;
}

const PRICES = [
  "$2,492.60",
  "$2,871.30",
  "$4,701.76",
  "$4,341.05",
  "$6,440.97",
  "$10,198.60",
  "$14,112.20",
  "$10,237.30",
  "$10,385.00",
  "$7,003.06",
  "$9,251.47",
  "$7,500.70",
  "$6,411.68",
  "$7,769.04",
  "$7,044.81",
  "$6,619.85",
  "$6,318.14",
  "$4,024.46",
];

const INTERVAL = 1250;

export default function BitcoinDemo({ className }: Props): JSX.Element {
  return (
    <div className={classNames("bitcoin-demo-container", className)}>
      <RotatingDemo
        className="bitcoin-demo-readout"
        entries={PRICES}
        interval={INTERVAL}
      />
    </div>
  );
}
