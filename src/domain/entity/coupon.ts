export default class Coupon {
  readonly code: string
  readonly percentage: number

  constructor (code: string, percentage: number, readonly expireDate?: Date) {
    this.code = code
    this.percentage = percentage
  }

  isValid (curretDate: Date = new Date()): boolean {
    if (!this.expireDate) return true
    return curretDate.getTime() <= this.expireDate.getTime()
  }

  applyDiscount (amount: number): number {
    return (amount * this.percentage) / 100
  }
}
