# Resentence

Easy-to-use React component for morphing one string into another. The demo
explains it much better than words can, so [go check out the
demo](https://dphilipson.github.io/resentence).

## Installation

With Yarn:

```
yarn add resentence
```

Or with NPM:

```
npm install resentence
```

## Usage

Wrap text you want to animate in a `<Resentence>` component, optionally passing
a `className` prop or a `speed` prop.

```tsx
import Resentence from "resentence";

// ...

render() {
    return <Resentence className="my-component" speed={1.5}>
        {this.props.text}
    </Resentence>;
}
```

The optional `speed` prop is a multiplier on the speed of the animation. See the
`demo/` directory for examples, but that's the entire API.

Copyright © 2019 David Philipson
