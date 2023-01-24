import { CouponRepository } from '../../../domain/repository/coupon-repository'

export class ValidateCoupon {
  readonly couponRepository: CouponRepository

  constructor (couponRepository: CouponRepository) {
    this.couponRepository = couponRepository
  }

  async execute (code: string): Promise<boolean> {
    const coupon = await this.couponRepository.findByCode(code)
    if (!coupon) throw new Error('Coupon not found')
    return coupon.isValid()
  }
}
