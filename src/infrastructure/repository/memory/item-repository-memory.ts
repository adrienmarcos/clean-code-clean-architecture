import { Item } from '../../../domain/entity/item'
import { ItemRepository } from '../../../domain/repository/item-repository'

export class ItemRepositoryMemory implements ItemRepository {
  private items: Item[]

  constructor () {
    this.items = [
      new Item(1, 'Musica', 'CD', 30, 30, 30, 10, 1),
      new Item(2, 'Vídeo', 'DVD', 50, 40, 20, 10, 1),
      new Item(3, 'Vídeo', 'VHS', 10, 40, 20, 10, 1),
      new Item(4, 'Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3),
      new Item(5, 'Instrumentos Musicais', 'Amplificador', 5000, 100, 50, 50, 20),
      new Item(6, 'Acessórios', 'Cabo', 30, 10, 10, 10, 0.9)
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
