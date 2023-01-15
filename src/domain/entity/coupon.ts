export default class Coupon {
  readonly code: string
  readonly percentage: number

  constructor (code: string, percentage: number) {
    this.code = code
    this.percentage = percentage
  }
}
