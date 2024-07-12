# is-really-node

Sometimes you want to make sure that the JavaScript runtime you're expecting to
be running on is the one you're actually running on. With this library, you can
detect whether you're actually running inside Node.js, and not Deno or Bun. A
single (default) export is provided, and it's a boolean that's true if we're
definitely running inside Node.js.

This is done by first checking various globals, and then attempting to alter v8
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
* Can't a runtime (or runtime user) pretending to be Node.js just intercept
  loading and replace this module with `true`?
    * Yes, but if _this_ module is specifically targetted, the runtime (or
      runtime user) is putting enough effort into faking Node.js that they can
      handle whatever comes out of that assumption on their own.
* Why no CommonJS?
  * Deno generally doesn't support CommonJS. Yes, it supports it via `npm:`
    imports, but that's difficult to use for testing. I'm lazy. Sorry.
  * That's a bad excuse though. Really I should make this work with `require`.
    Submit a PR that handles this and I'll add it.

## License

The MIT License. See LICENSE.txt
