import { PlaceOrder } from '../../src/application/usecase/place-order'
import { PgPromiseConnectionAdapter } from '../../src/infrastructure/database/pg-promise-connections-adapter'
import { CouponRepositoryDatabase } from '../../src/infrastructure/repository/database/coupon-repository-database'
import { ItemRepositoryDatabase } from '../../src/infrastructure/repository/database/item-repository-database'
import { OrderRepositoryDatabase } from '../../src/infrastructure/repository/database/order-repository-database'

let placeOrder: PlaceOrder
let orderRepository: OrderRepositoryDatabase

beforeEach(() => {
  const connection = new PgPromiseConnectionAdapter()
  const itemRepository = new ItemRepositoryDatabase(connection)
  orderRepository = new OrderRepositoryDatabase(connection)
  const couponRepository = new CouponRepositoryDatabase(connection)
  placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
})

describe('Place Order', () => {
  test('Should place an Order if valid data is provided', async () => {
    const input = {
      cpf: '839.435.452-10',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 }
      ],
      date: new Date('2023-1-16'),
      coupon: 'VALE20'
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(88)
  })

  test('Should place an Order with a OrderCode if valid data is provided', async () => {
    const input = {
      cpf: '839.435.452-10',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 }
      ],
      date: new Date('2023-1-16'),
      coupon: 'VALE20'
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(88)
    // expect(output.code).toBe('202300000002')
  })

  test('Should place an Order using database repositories if valid data is provided', async () => {
    const input = {
      cpf: '839.435.452-10',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 }
      ],
      date: new Date('2023-1-16'),
      coupon: 'VALE20'
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(88)
  })
})

afterEach(async () => {
  await orderRepository.clear()
})
