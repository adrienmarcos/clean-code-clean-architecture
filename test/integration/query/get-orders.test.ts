import { GetOrders } from '../../../src/application/query/get-orders/get-orders'
import { PlaceOrder } from '../../../src/application/usecase/place-order/place-order'
import { OrderDAODatabase } from '../../../src/infrastructure/dao/order-dao-database'
import { PgPromiseConnectionAdapter } from '../../../src/infrastructure/database/pg-promise-connections-adapter'
import { DatabaseRepositoryFactory } from '../../../src/infrastructure/factory/database-repository-factory'
import { OrderRepositoryDatabase } from '../../../src/infrastructure/repository/database/order-repository-database'

let placeOrder: PlaceOrder
let getOrders: GetOrders
let orderRepository: OrderRepositoryDatabase

beforeEach(() => {
  const connection = PgPromiseConnectionAdapter.getInstance()
  orderRepository = new OrderRepositoryDatabase(connection)
  const repositoryFactory = new DatabaseRepositoryFactory()
  const orderDAO = new OrderDAODatabase(connection)
  placeOrder = new PlaceOrder(repositoryFactory)
  getOrders = new GetOrders(orderDAO)
})

describe('Get Order', () => {
  test('Should get all Orders if valid data is provided', async () => {
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
    const getOrderOutput = await getOrders.execute()
    expect(getOrderOutput.orders).toHaveLength(1)
  })
})

afterEach(async () => {
  await orderRepository.clear()
})
