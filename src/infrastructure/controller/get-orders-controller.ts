import { GetOrders } from '../../application/usecase/get-orders/get-orders'
import { RepositoryFactory } from '../../domain/factory/repository-factory'

export class GetOrdersController {
  readonly repositoryFactory: RepositoryFactory

  constructor (repositoryFactory: RepositoryFactory) {
    this.repositoryFactory = repositoryFactory
  }

  async execute (params: any, body: any): Promise<any> {
    const getOrders = new GetOrders(this.repositoryFactory)
    const getOrdersOutput = await getOrders.execute()
    return getOrdersOutput
  }
}
