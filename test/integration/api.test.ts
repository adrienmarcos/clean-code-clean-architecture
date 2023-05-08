import axios from 'axios'
import { PlaceOrder } from '../../src/application/usecase/place-order/place-order'
import { PgPromiseConnectionAdapter } from '../../src/infrastructure/database/pg-promise-connections-adapter'
import { DatabaseRepositoryFactory } from '../../src/infrastructure/factory/database-repository-factory'
import { OrderRepositoryDatabase } from '../../src/infrastructure/repository/database/order-repository-database'

let placeOrder: PlaceOrder
let orderRepository: OrderRepositoryDatabase

beforeEach(() => {
  const connection = PgPromiseConnectionAdapter.getInstance()
  orderRepository = new OrderRepositoryDatabase(connection)
  const repositoryFactory = new DatabaseRepositoryFactory()
  placeOrder = new PlaceOrder(repositoryFactory)
})

describe('Api', () => {
  test('Should test the Api at url /orders using POST method', async () => {
    const response = await axios({
      url: 'http://localhost:3000/orders',
      method: 'post',
      data: {
        cpf: '839.435.452-10',
        orderItems: [
          { idItem: 1, quantity: 1 },
          { idItem: 2, quantity: 1 },
          { idItem: 3, quantity: 3 }
        ],
        date: new Date('2023-1-16'),
        coupon: 'VALE20'
      }
    })
    const order = response.data
    expect(order.total).toBe(88)
  })

  test('Should test the Api at url /simulateFreight using POST method', async () => {
    const response = await axios({
      url: 'http://localhost:3000/simulateFreight',
      method: 'post',
      data: {
        items: [
          { idItem: 4, quantity: 1 },
          { idItem: 5, quantity: 1 },
          { idItem: 6, quantity: 3 }
        ]
      }
    })
    const output = response.data
    expect(output.amount).toBe(260)
  })

  test('Should test the Api at url /orders using GET method', async () => {
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
    await placeOrder.execute(input)
    const response = await axios({
      url: 'http://localhost:3000/orders',
      method: 'get'
    })
    const output = response.data
    expect(output.orders).toHaveLength(1)
  })
})

afterEach(async () => {
  await orderRepository.clear()
})
