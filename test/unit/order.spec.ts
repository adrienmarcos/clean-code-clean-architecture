import Order from '../../src/domain/entity/order'

describe('Order', () => {
  test('Should create an order if valid cpf is provided', () => {
    const order = new Order('839.435.452-10')
    expect(order.getCpf()).toBe('839.435.452-10')
    expect(order.getTotal()).toBe(0)
  })
})
