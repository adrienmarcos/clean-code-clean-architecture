import { SimulateFreight } from '../../application/usecase/simulate-freight/simulate-freigth'
import { DefaultFreightCalculator } from '../../domain/entity/default-freight-calculator'
import { RepositoryFactory } from '../../domain/factory/repository-factory'
import { GetOrderController } from '../controller/get-order-controller'
import { GetOrdersController } from '../controller/get-orders-controller'
import { PlaceOrderController } from '../controller/place-order-controller'
import { Connection } from '../database/connection'
import { PgPromiseConnectionAdapter } from '../database/pg-promise-connections-adapter'
import { ItemRepositoryDatabase } from '../repository/database/item-repository-database'
import { Http } from './http'

export class RouteConfig {
  constructor (http: Http, repositoryFactory: RepositoryFactory, connection: Connection) {
    http.on('/orders', 'post', async (params: any, body: any) => {
      const placeOrderController = new PlaceOrderController(repositoryFactory)
      return await placeOrderController.execute(params, body)
    })

    http.on('/orders', 'get', async (params: any, body: any) => {
      const getOrdersController = new GetOrdersController(repositoryFactory)
      return await getOrdersController.execute(params, body)
    })

    http.on('/orders/:code', 'get', async (params: any, body: any) => {
      const getOrderController = new GetOrderController(connection)
      return await getOrderController.execute(params, body)
    })

    http.on('/simulateFreight', 'post', async (params: any, body: any) => {
      const itemRepository = new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
      const simulateFreight = new SimulateFreight(itemRepository, new DefaultFreightCalculator())
      const input = body
      return await simulateFreight.execute(input)
    })
  }
}
