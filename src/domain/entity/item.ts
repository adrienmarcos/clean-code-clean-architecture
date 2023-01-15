export default class Item {
  readonly id: number
  readonly category: string
  readonly description: string
  readonly price: number

  constructor (id: number, category: string, description: string, price: number) {
    this.id = id
    this.category = category
    this.description = description
    this.price = price
  }
}
