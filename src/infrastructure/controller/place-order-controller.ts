import { PlaceOrder } from '../../application/usecase/place-order/place-order'
import { RepositoryFactory } from '../../domain/factory/repository-factory'

export class PlaceOrderController {
  readonly repositoryFactory: RepositoryFactory

  constructor (repositoryFactory: RepositoryFactory) {
    this.repositoryFactory = repositoryFactory
  }

  async execute (params: any, body: any): Promise<any> {
    const placeOrder = new PlaceOrder(this.repositoryFactory)
    const input = body
    input.date = new Date(input.date)
    return await placeOrder.execute(input)
  }
}
