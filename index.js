/**
  * Let's check for some basic globals. If these aren't present, game over.
  */
function hasNodeGlobals() {
  return typeof global === 'object' &&
    typeof globalThis === 'object' &&
    global === globalThis &&
    global.global === global &&
    globalThis.globalThis === globalThis &&
    typeof process === 'object'
}

/**
  * Now, we check for the Bun global object. The Bun object is 
  * non-configurable, so it would be very hard to get past this if trying to 
  * pretend to be Node.js.
  */
function hasBunGlobal() {
  // @ts-expect-error checking for Bun global
  return typeof Bun !== 'undefined' ||
    typeof global.Bun !== 'undefined'
}

/**
  * We'll do the same here for Deno. The Deno object _can_ be deleted, so this
  * could be faked around, so we need the subsequent test as well.
  */
function hasDenoGlobal() {
  // @ts-expect-error checking for Deno global
  return typeof Deno === 'object' ||
    typeof global.Deno === 'object'
}

/**
  * V8 has "natives syntax" which allows us to do some sneaky things. We'll now
  * test that those sneaky things are there and working. If it works, then
  * we're definitely not in Bun, which uses JSC. If it does, we'll try to
  * disable it, ruling out Deno.
  */
async function isNodeIshV8() {
  let v8
  try {
    v8 = await import('node:v8')
  } catch {
    return false
  }

  function privateSymbol() {
    try {
      const sym = eval('%CreatePrivateSymbol("testing")')
      const obj = {}
      obj[sym] = 3
      return !Reflect.ownKeys(obj).includes(sym) && obj[sym] === 3
    } catch {
      return false
    }
  }

  // JSC/Bun doesn't support V8's native syntax.
  if (privateSymbol()) {
    // Natives syntax was on. Try turning it off. That' won't work in Deno.
    v8.setFlagsFromString('--no-allow-natives-syntax')
    return !privateSymbol()
  }

  // Deno "supports" this, but it does nothing. So if it failed before, it
  // will fail again.
  v8.setFlagsFromString('--allow-natives-syntax')
  return privateSymbol()
}

/**
 * Returns true if we're definitely running inside Node.js.
 */
const isReallyNode = hasNodeGlobals() &&
  !hasBunGlobal() &&
  !hasDenoGlobal() &&
  await isNodeIshV8()

export default isReallyNode;
