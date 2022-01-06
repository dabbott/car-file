import { CarWriter } from '@ipld/car/writer'
import { Blockstore } from 'interface-blockstore'
import {
  ImportCandidate,
  importer,
  UserImporterOptions,
} from 'ipfs-unixfs-importer'
import { CID } from 'multiformats'
import { PartialBlockstore } from './PartialBlockstore'
import { asyncIterableToArray, concat } from './collections'

export type Car = { cid: CID; content: Uint8Array }

export async function createCar(
  files: ImportCandidate[],
  options: UserImporterOptions = {
    cidVersion: 1,
    wrapWithDirectory: true,
    rawLeaves: true,
  },
  blockStore: Blockstore = new PartialBlockstore() as unknown as Blockstore
): Promise<Car> {
  const entries = await asyncIterableToArray(
    importer(files, blockStore, options)
  )

  const cid = entries[entries.length - 1].cid

  const { writer, out } = CarWriter.create(cid)

  for await (const block of blockStore.query({})) {
    writer.put({ cid: block.key, bytes: block.value })
  }

  writer.close()

  return { cid, content: concat(await asyncIterableToArray(out)) }
}
