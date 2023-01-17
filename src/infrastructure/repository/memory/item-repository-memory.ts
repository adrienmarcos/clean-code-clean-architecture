import { Item } from '../../../domain/entity/item'
import { ItemRepository } from '../../../domain/repository/item-repository'

export class ItemRepositoryMemory implements ItemRepository {
  private items: Item[]

  constructor () {
    this.items = [
      new Item(1, 'Musica', 'CD', 30),
      new Item(2, 'Video', 'DVD', 50),
      new Item(3, 'Video', 'VHS', 10)
    ]
  }

  async delete (itemToBeRemoved: Item): Promise<void> {
    const item = this.items.find((item) => item.id === itemToBeRemoved.id)
    if (!item) throw new Error('Item not found')
    this.items = this.items.filter((item) => item.id !== itemToBeRemoved.id)
  }

  async findAll (): Promise<Item[]> {
    return this.items
  }

  async save (itemToBeSaved: Item): Promise<void> {
    if (!itemToBeSaved) return
    if (this.items.find((item) => item.id === itemToBeSaved.id)) throw new Error('Item duplicated')
    this.items.push(itemToBeSaved)
  }

  async findById (idItem: number): Promise<Item | undefined> {
    return this.items.find((item) => item.id === idItem)
  }
}
