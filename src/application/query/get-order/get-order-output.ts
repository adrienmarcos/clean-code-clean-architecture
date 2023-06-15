export class GetOrderOutput {
  readonly code: string
  readonly total: number

  constructor (code: string, total: number) {
    this.code = code
    this.total = total
  }
}
