export class PlaceOrderOutput {
  readonly total: number
  readonly code: string

  constructor (code: string, total: number) {
    this.total = total
    this.code = code
  }
}
