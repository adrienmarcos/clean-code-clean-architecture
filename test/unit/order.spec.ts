import Coupon from '../../src/domain/entity/coupon'
import Item from '../../src/domain/entity/item'
import Order from '../../src/domain/entity/order'

describe('Order Entity', () => {
  test('Should create an Order if valid cpf is provided', () => {
    const order = new Order('839.435.452-10')
    expect(order.getCpf().getValue()).toBe('839.435.452-10')
    expect(order.getTotal()).toBe(0)
    expect(order.getQuantity()).toBe(0)
  })

  test('Should throw an error if invalid cpf is provided', () => {
    expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid Cpf'))
  })

  test('Should create an Order with 3 items if valid values is provided', () => {
    const order = new Order('839.435.452-10')
    order.addItem(new Item(1, 'Musica', 'CD', 30), 3)
    order.addItem(new Item(2, 'Video', 'DVD', 50), 1)
    order.addItem(new Item(3, 'Video', 'VHS', 10), 2)
    expect(order.getCpf().getValue()).toBe('839.435.452-10')
    expect(order.getTotal()).toBe(160)
    expect(order.getQuantity()).toBe(6)
  })

  test('Should create an Order with 3 items and a valid coupun if valid values is provided', () => {
    const order = new Order('839.435.452-10')
    order.addItem(new Item(1, 'Musica', 'CD', 30), 3)
    order.addItem(new Item(2, 'Video', 'DVD', 50), 1)
    order.addItem(new Item(3, 'Video', 'VHS', 10), 2)
    order.addCoupon(new Coupon('Vale20', 20))
    expect(order.getCpf().getValue()).toBe('839.435.452-10')
    expect(order.getQuantity()).toBe(6)
    expect(order.getTotal()).toBe(128)
  })

  test('Should create an Order with 3 items and a expired coupun if valid values is provided', () => {
    const order = new Order('839.435.452-10', new Date('2023-1-16'))
    order.addItem(new Item(1, 'Musica', 'CD', 30), 3)
    order.addItem(new Item(2, 'Video', 'DVD', 50), 1)
    order.addItem(new Item(3, 'Video', 'VHS', 10), 2)
    order.addCoupon(new Coupon('Vale20', 20, new Date('2023-1-15')))
    expect(order.getCpf().getValue()).toBe('839.435.452-10')
    expect(order.getQuantity()).toBe(6)
    expect(order.getTotal()).toBe(160)
  })

  // test('Should create on Order with 3 items and calculate the freight', () => {
  //   const order = new Order('839.435.452-10', new Date('2023-1-16'))
  //   order.addItem(new Item(1, 'Instrumentos Musicais', 'Guitarra', 2000), 1)
  //   order.addItem(new Item(2, 'Instrumentos Musicais', 'Amplificador', 5000), 1)
  //   order.addItem(new Item(3, 'Acessórios', 'Cabo', 10), 3)
  //   expect(order.getCpf().getValue()).toBe('839.435.452-10')
  // })
})
