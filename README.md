# is-really-node

Sometimes you want to make sure that the JavaScript runtime you're expecting to
be running on is the one you're actually running on. With this library, you can
detect whether you're actually running inside Node.js, and not Deno or Bun. A
single (default) export is provided, and it's a boolean that's true if we're
definitely running inside Node.js.

This is done by first checking verious globals, and then attempting to alter v8
options, and testing those options have been altered. This is only currently
possible in Node.js. The aim is to never have false negatives, and also load
quickly if the globals-checking gives us a negative.

## Some Details (FAQ)

* Why not TypeScript or at least JSDoc?
  * The module is very small, and the code does some things that would probably
  piss off `tsc`.
  * I don't use TypeScript in my day job, so I tend not to default to it. Don't
  worry, I'm not one of those haters you see on Twitter.
  * Submit a PR that works correctly and I'll add it.
* Okay, but why no `.d.ts`?
  * I'm lazy and Keep forgetting how to do that for default exports, since I
  don't use TypeScript in my day job. Submit a PR and I'll add it.
* Do you just hate Bun and Deno? Are you some Node.js purist? They're both 
  Node.js compatible anyway!
  * No. A lot of code I work with targets very specific runtime things that
    only work in Node.js, so I want an easy way to bail early if that stuff
    isn't going to work, even if the runtime is trying to fake that it's
    Node.js. That's all. Please feel free to create `is-really-bun` or
    `is-really-deno` if that suits your work.
* Isn't checking the globals alone enough?
  * Nope. If folks are trying to fake that they're in Node.js, they can always
    mess with the globals. Instead we need to do something that's _truly_
    impossible in the other platforms, like messing with v8 options.
* Why no CommonJS?
  * Deno doesn't support CommonJS, AFAIK.
  * That's a bad excuse though. Really I should make this work with `require`
    on  platforms that support it. Submit a PR that handles this and I'll add
    it.

## License

The MIT License. See LICENSE.txt
