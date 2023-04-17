import { RepositoryFactory } from '../../../domain/factory/repository-factory'
import { OrderRepository } from '../../../domain/repository/order-repository'
import { GetOrderOutput } from './get-order-output'

export class GetOrder {
  readonly orderRepository: OrderRepository

  constructor (repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository()
  }

  async execute (code: string): Promise<GetOrderOutput> {
    const order = await this.orderRepository.get(code)
    const getOrderOutput = new GetOrderOutput(order.getCode(), order.getTotal())
    return getOrderOutput
  }
}
