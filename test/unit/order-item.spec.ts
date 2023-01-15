import OrderItem from '../../src/domain/entity/order-item'

describe('OrderItem Entity', () => {
  test('Should create an OrderItem for an Order', () => {
    const orderItem = new OrderItem(1, 1000, 10)
    expect(orderItem.getTotal()).toBe(10000)
  })
})
