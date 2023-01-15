import Coupon from '../../src/domain/entity/coupon'

describe('Coupon Entity', () => {
  test('Should create a valid discount coupon if correct data is provided', () => {
    const coupon = new Coupon('Vale20', 20)
    expect(coupon.isValid(new Date())).toBeTruthy()
  })

  test('Should create a expired discount coupon if correct data is provided', () => {
    const coupon = new Coupon('Vale20', 20, new Date('2023-1-10'))
    expect(coupon.isValid(new Date())).toBeFalsy()
  })
})
