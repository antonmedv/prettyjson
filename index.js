'use strict'
const chalk = require('chalk')
const indent = require('indent-string')

function print(v, space = 2) {
  if (typeof v === 'undefined') {
    return void 0
  }

  if (v === null) {
    return chalk.grey.bold(v)
  }

  if (typeof v === 'number' && Number.isFinite(v)) {
    return chalk.cyan.bold(v)

  }

  if (typeof v === 'boolean') {
    return chalk.yellow.bold(v)

  }

  if (typeof v === 'string') {
    return chalk.green.bold(JSON.stringify(v))
  }

  if (Array.isArray(v)) {
    return gen(function* () {
      yield '[\n'
      const len = v.length
      let i = 0
      for (let item of v) {
        if (typeof item === 'undefined') {
          yield indent(print(null, space), space) // JSON.stringify compatibility
        } else {
          yield indent(print(item, space), space)
        }
        yield i++ < len - 1 ? ',\n' : '\n'
      }
      yield ']'
    })
  }

  if (typeof v === 'object' && v.constructor === Object) {
    return gen(function* () {
      yield '{\n'
      const entries = Object.entries(v)
        .filter(([key, value]) => typeof value !== 'undefined') // JSON.stringify compatibility
      const len = entries.length
      let i = 0
      for (let [key, value] of entries) {
        yield indent(chalk.blue.bold(`"${key}"`) + ': ' + print(value, space), space)
        yield i++ < len - 1 ? ',\n' : '\n'
      }
      yield '}'
    })
  }

  return JSON.stringify(v, null, 2)
}

function gen(fn) {
  return [...fn()].join('')
}

module.exports = print
