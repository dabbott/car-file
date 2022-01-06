import { Car, createCar } from '../index'
import { TextEncoder } from 'util'

// Convert a Car into a format that looks compact in snapshot tests
function serialize(car: Car) {
  return {
    cid: car.cid.toString(),
    content: Buffer.from(car.content).toString('base64'),
  }
}

it('packs a file', async () => {
  const car = await createCar([
    {
      path: '/hello',
      content: new Uint8Array([0, 1, 2, 3]),
    },
  ])

  expect(serialize(car)).toMatchSnapshot()
})

it('packs a directory', async () => {
  const car = await createCar([
    {
      path: '/hello.txt',
      content: new TextEncoder().encode('Hello, world!'),
    },
    {
      path: '/dir/a.txt',
      content: new TextEncoder().encode('Hello a'),
    },
    {
      path: '/dir/b.txt',
      content: new TextEncoder().encode('Hello b'),
    },
  ])

  expect(serialize(car)).toMatchSnapshot()
})

it('empty archive', async () => {
  const car = await createCar([])

  expect(serialize(car)).toMatchSnapshot()
})

it('empty file', async () => {
  const car = await createCar([{ path: '/hello' }])

  expect(serialize(car)).toMatchSnapshot()
})
