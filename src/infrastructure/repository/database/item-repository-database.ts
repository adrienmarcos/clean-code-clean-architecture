import { Item } from '../../../domain/entity/item'
import { ItemRepository } from '../../../domain/repository/item-repository'
import { Connection } from '../../database/connection'

export class ItemRepositoryDatabase implements ItemRepository {
  readonly connection: Connection

  constructor (connection: Connection) {
    this.connection = connection
  }

  async findById (idItem: number): Promise<Item | undefined> {
    const [itemData] = await this.connection.query('Select * from ccca.tb_item where id = $1', [idItem])
    if (!itemData) throw new Error('Item not found')
    return new Item(itemData.id, itemData.category, itemData.description, itemData.price, itemData.width, itemData.height,
      itemData.length, itemData.weight)
  }

  async save (item: Item): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findAll (): Promise<Item[]> {
    const itemData = await this.connection.query('Select * from ccca.tb_item', [])
    return itemData
  }

  async delete (item: Item): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
