import { GetOrder } from '../../application/usecase/get-order/get-order'
import { RepositoryFactory } from '../../domain/factory/repository-factory'

export class GetOrderController {
  readonly repositoryFactory: RepositoryFactory

  constructor (repositoryFactory: RepositoryFactory) {
    this.repositoryFactory = repositoryFactory
  }

  async execute (params: any, body: any): Promise<any> {
    const getOrder = new GetOrder(this.repositoryFactory)
    const getOrderOutput = await getOrder.execute(params.code)
    return getOrderOutput
  }
}
