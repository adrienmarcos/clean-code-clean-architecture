export class Coupon {
  readonly code: string
  readonly percentage: number

  constructor (code: string, percentage: number, readonly expireDate?: Date) {
    this.code = code
    this.percentage = percentage
  }

  isValid (currentDate: Date = new Date()): boolean {
    if (!this.expireDate) return true
    return currentDate.getTime() <= this.expireDate.getTime()
  }

  calculateDiscount (amount: number): number {
    if (!this.isValid()) return 0
    return (amount * this.percentage) / 100
  }
}
