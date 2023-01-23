import { OrderCode } from '../../src/domain/entity/order-code'

describe('OrderCode', () => {
  test('Should create a OrderCode if valid data is provided', () => {
    const orderCode = new OrderCode(new Date('2023-1-23'), 20)
    expect(orderCode.getValue()).toBe('202300000020')
  })
})
