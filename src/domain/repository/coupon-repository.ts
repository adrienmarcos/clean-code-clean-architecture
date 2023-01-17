import { Coupon } from '../entity/coupon'

export interface CouponRepository {
  findByCode(code: string): Promise<Coupon | undefined>
  save(coupon: Coupon): Promise<void>
  delete(coupon: Coupon): Promise<void>
}
