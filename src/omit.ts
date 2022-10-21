const object = {
  a: 3,
  b: 4,
  c: 5,
}

// => { c: 5 }
omit(object, ['a'])
function omit<T extends Record<string, any>, K extends string, K2 extends keyof T>(obj: T, keys: (K | K2)[]) {
  const result = { ...obj }

  keys.forEach((key) => {
    delete result[key]
  })

  return result as Omit<T, K>
}

// omit by value
// => { b:4, c: 5 }
omitBy(object, value => value === 3)
function omitBy<T extends Record<string, any>, K extends keyof T>(object: T, callback: (value: T[K], key: K) => boolean) {
  const result = { ...object }

  Object.entries(result).forEach(([key, value]) => {
    const isDrop = callback(value, key as K)

    if (isDrop)
      delete result[key]
  })

  return result as Partial<T>
}

