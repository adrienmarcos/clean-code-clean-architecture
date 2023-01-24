export class SimulateFreightInput {
  readonly items: Array<{ idItem: number, quantity: number }>

  constructor (items: Array<{ idItem: number, quantity: number }>) {
    this.items = items
  }
}
