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

Wrap text you want to animate in a `<Resentence>` component and specify an
`align` prop, optionally passing `className` or `speed` props as well.

```tsx
import Resentence from "resentence";

// ...

render() {
    return <Resentence className="my-component" align="left" speed={1.5}>
        {this.props.text}
    </Resentence>;
}
```

The props are as follows:

| Prop name   | Required? | Type                          | Description                                                             |
| ----------- | --------- | ----------------------------- | ----------------------------------------------------------------------- |
| `align`     | Yes       | `"left" | "center" | "right"` | How the text is aligned in the document layout. For details, see below. |
| `className` | No        | `string`                      | CSS classes that are passed to the Resentence element.                  |
| `speed`     | No        | `number`                      | Factor by which the animation speed is multiplied (default: 1).         |

### About the `align` prop

Resentence needs a bit of help to compute character positions if the Resentence
element changes size as its text changes, which is a pretty common occurrence
for elements containing text. To correctly animate the transition when the
container changes size, Resentence needs to know which part of the text is the
"fixed point" and should remain in the same location relative to the container
as the container changes size.

Thus, Resentence requires the consumer to tell it how its text is aligned. This
is often, but not always, the same as the container's computed `text-align` CSS
property. For example, right-aligned text can be produced by placing text at the
end of a flexbox row if it is given flex values to take no more space than
needed, aligning the text to the right side regardless of its `text-align`
property. Rather than attempt to compute effective alignments for all possible
layouts, Resentence instead asks the consumer to let it know how it will be used
in the larger layout of the page.

Copyright © 2019 David Philipson
