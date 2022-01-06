import { Blockstore } from 'interface-blockstore'
import { CID } from 'multiformats'

/**
 * The minimum Blockstore implementation needed to write a Car file
 */
export class PartialBlockstore implements Partial<Blockstore> {
  store: Map<CID, Uint8Array>

  constructor() {
    this.store = new Map()
  }

  async *query() {
    for (const [cid, bytes] of this.store.entries()) {
      yield { key: cid, value: bytes }
    }
  }

  async put(cid: CID, bytes: Uint8Array): Promise<void> {
    this.store.set(cid, bytes)
  }

  async get(cid: CID): Promise<Uint8Array> {
    return this.store.get(cid)!
  }
}
