const test = require('ava')
const print = require('.')

test('print', t => {
  t.is(
    print({
      "array": [
        "foo",
        "bar",
        "baz"
      ],
      "bool": false,
      "map": {
        "foo": "bar",
        "void": void 0
      },
      "null": null,
      "num": 100,
      "str": "foo"
    }),
    `{
  [34m[1m"array"[22m[39m: [
    [32m[1m"foo"[22m[39m,
    [32m[1m"bar"[22m[39m,
    [32m[1m"baz"[22m[39m
  ],
  [34m[1m"bool"[22m[39m: [33m[1mfalse[22m[39m,
  [34m[1m"map"[22m[39m: {
    [34m[1m"foo"[22m[39m: [32m[1m"bar"[22m[39m
  },
  [34m[1m"null"[22m[39m: [90m[1mnull[22m[39m,
  [34m[1m"num"[22m[39m: [36m[1m100[22m[39m,
  [34m[1m"str"[22m[39m: [32m[1m"foo"[22m[39m
}`)
})

test('indent', t => {
  t.is(
    print({"array": [["foo", ["bar", ["baz"]]]]}, 4),
    `{
    [34m[1m"array"[22m[39m: [
        [
            [32m[1m"foo"[22m[39m,
            [
                [32m[1m"bar"[22m[39m,
                [
                    [32m[1m"baz"[22m[39m
                ]
            ]
        ]
    ]
}`
   )
})
