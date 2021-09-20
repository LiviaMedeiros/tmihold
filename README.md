# tmihold

Yet another minimalistic tap&hold implementation with circle effect.

## Import
```js
import tmihold from 'tmihold.mjs'; // default
```

## Usage
### callback mode
```js
const remover = tmihold(Element el, Function cb, any ...args);
```
`el` is target element, `cb` is callback function, `...args` are optional arguments for callback.<br>
Returned value (`remover`) is a function that removes all event listeners created by this call.

### Promise mode
If `cb` is `null` or omitted, it returns a Promise which is resolved by tap&hold.<br>
On resolve, event listeners are removed; so the event is fired only once. Result is `el`, rest `...args` are ignored.
```js
const elem = await tmihold(getElementById('elem_id'));
// or
tmihold(getElementById('elem_id')).then(elem => {/* ... */});
```

## Trivia
Default target element is `document`.<br>
Tap behaviour, duration and effect id are hardcoded.

## Visual effect
Circle animation is implemented with conic gradient as `mask-image`. As of September 2021, it's prefixed for WebKit and doesn't seem to work in Gecko. Whatever.
