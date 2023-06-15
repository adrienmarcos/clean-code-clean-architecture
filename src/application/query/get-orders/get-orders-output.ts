export class GetOrdersOutput {
  readonly orders: Array<{ code: string, total: number }>

  constructor () {
    this.orders = []
  }

  addOrder (code: string, total: number): void {
    this.orders.push({ code, total })
  }
}
