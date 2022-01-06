/**
 * Concatenate Uint8Arrays
 *
 * @param arrays
 * @returns
 */
export function concat(arrays: Uint8Array[]) {
  const byteCount = arrays
    .map((array) => array.length)
    .reduce((result, length) => result + length)

  let result = new Uint8Array(byteCount)
  let offset = 0

  for (const array of arrays) {
    result.set(array, offset)
    offset += array.length
  }

  return result
}

/**
 * Convert an async iterable to an array
 *
 * @param iterable
 * @returns
 */
export async function asyncIterableToArray<T>(
  iterable: AsyncIterable<T>
): Promise<T[]> {
  const chunks = []

  for await (const chunk of iterable) {
    chunks.push(chunk)
  }

  return chunks
}
