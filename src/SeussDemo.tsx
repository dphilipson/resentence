import React from "react";
import RotatingDemo from "./RotatingDemo";

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
];

const INTERVAL = 2000;

export default function SeussDemo(): JSX.Element {
  return <RotatingDemo entries={LINES} interval={INTERVAL} />;
}
