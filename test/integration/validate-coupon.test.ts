import { ValidateCoupon } from '../../src/application/usecase/validate-coupon/validate-coupon'
import { PgPromiseConnectionAdapter } from '../../src/infrastructure/database/pg-promise-connections-adapter'
import { CouponRepositoryDatabase } from '../../src/infrastructure/repository/database/coupon-repository-database'

describe('Validate Coupon', () => {
  test('Should validate a valid discount Coupon ', () => {
    const connection = new PgPromiseConnectionAdapter()
    const couponRepository = new CouponRepositoryDatabase(connection)
    const validateCoupon = new ValidateCoupon(couponRepository)
    const isValid = validateCoupon.execute('VALE20')
    expect(isValid).toBeTruthy()
  })
})
