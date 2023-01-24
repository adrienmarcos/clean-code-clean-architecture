
export class PlaceOrderInput {
  readonly cpf: string
  readonly orderItems: Array<{ idItem: number, quantity: number }>
  readonly date: Date

  constructor (cpf: string, orderItems: Array<{ idItem: number, quantity: number }>, date: Date, readonly coupon?: string) {
    this.cpf = cpf
    this.orderItems = orderItems
    this.date = date
  }
}
