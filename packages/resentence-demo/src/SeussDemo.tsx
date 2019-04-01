import React, { memo } from "react";
import RotatingDemo from "./RotatingDemo";

interface Props {
  className?: string;
}

const LINES = [
  "One fish",
  "Two fish",
  "Red fish",
  "Blue fish.",
  "Black fish",
  "Blue fish",
  "Old fish",
  "New fish.",
  "This one has a little star.",
  "This one has a little car.",
  "Say! What a lot",
  "Of fish there are.",
  "Yes. Some are red.",
  "And some are blue.",
  "Some are old.",
  "And some are new.",
  "Some are sad.",
  "And some are glad.",
  "And some are very, very bad.",
  // Repeat last line so it displays twice as long.
  "And some are very, very bad.",
];

const INTERVAL = 1250;

const SeussDemo = memo(function SeussDemo({ className }: Props): JSX.Element {
  return (
    <RotatingDemo
      className={className}
      entries={LINES}
      interval={INTERVAL}
      align="center"
    />
  );
});
export default SeussDemo;
