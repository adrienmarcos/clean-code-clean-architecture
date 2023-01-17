import { Item } from '../entity/item'

export interface ItemRepository {
  findById(idItem: number): Promise<Item | undefined>
  save(item: Item): Promise<void>
  findAll(): Promise<Item[]>
  delete(item: Item): Promise<void>
}
