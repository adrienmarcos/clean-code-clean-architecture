import { RepositoryFactory } from '../../../domain/factory/repository-factory'
import { OrderRepository } from '../../../domain/repository/order-repository'
import { GetOrdersOutput } from './get-orders-output'

export class GetOrders {
  readonly orderRepository: OrderRepository

  constructor (repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository()
  }

  async execute (): Promise<GetOrdersOutput> {
    const orders = await this.orderRepository.findAll()
    const getOrdersOutput = new GetOrdersOutput()
    for (const order of orders) {
      getOrdersOutput.addOrder(order.getCode(), order.getTotal())
    }
    return getOrdersOutput
  }
}
