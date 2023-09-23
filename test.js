import { exec } from 'child_process'
import test from 'node:test'
import assert from 'assert'

function run(...args) {
  return new Promise((resolve, reject) => {
    exec(...args, (err, stdout, stderr) => {
      if (err) reject(err)
      resolve({ stdout, stderr })
    })
  })
}

test('Node.js', async () => {
  await run('node test/node-test.js')
})

test('Node.js (allow-natives-syntax)', async () => {
  await run('node --allow-natives-syntax test/node-test.js')
})

test('Node.js (no-allow-natives-syntax)', async () => {
  await run('node --no-allow-natives-syntax test/node-test.js')
})

test('Deno', async () => {
  await assert.rejects(
    () => run('deno run test/node-test.js')
  )
})

test('Deno (faking Node.js)', async () => {
  await assert.rejects(
    () => run('deno run test/deno-test.js')
  )
})

test('Deno (faking Node.js) (allow-natives-syntax)', async () => {
  await assert.rejects(
    () => run('deno run --v8-flags="--allow-natives-syntax" test/deno-test.js')
  )
})

test('Deno (faking Node.js) (no-allow-natives-syntax)', async () => {
  await assert.rejects(
    () => run('deno run --v8-flags="--allow-natives-syntax" test/deno-test.js')
  )
})

test('Bun', async () => {
  await assert.rejects(
    () => run('deno run test/node-test.js')
  )
})

test('Bun (faking Node.js)', async () => {
  await assert.rejects(
    () => run('deno run test/deno-test.js')
  )
})

