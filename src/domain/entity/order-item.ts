export class OrderItem {
  readonly idItem: number
  readonly price: number
  readonly quantity: number

  constructor (idItem: number, price: number, quantity: number) {
    this.idItem = idItem
    this.price = price
    this.quantity = quantity
  }

  getTotal (): number {
    return this.price * this.quantity
  }
}
