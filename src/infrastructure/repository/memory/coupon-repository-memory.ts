import { Coupon } from '../../../domain/entity/coupon'
import { CouponRepository } from '../../../domain/repository/coupon-repository'

export class CouponRepositoryMemory implements CouponRepository {
  private coupons: Coupon[]

  constructor () {
    this.coupons = [
      new Coupon('Vale20', 20)
    ]
  }

  async delete (couponToBeRemoved: Coupon): Promise<void> {
    const coupon = this.coupons.find((coupon) => coupon.code === couponToBeRemoved.code)
    if (!coupon) throw new Error('Coupon not found')
    this.coupons = this.coupons.filter((coupon) => coupon.code !== couponToBeRemoved.code)
  }

  async save (couponToBeSaved: Coupon): Promise<void> {
    if (!couponToBeSaved) return
    if (this.coupons.find((coupon) => coupon.code === couponToBeSaved.code)) return
    this.coupons.push(couponToBeSaved)
  }

  async findByCode (code: string): Promise<Coupon | undefined> {
    return this.coupons.find((coupon) => coupon.code === code)
  }
}
