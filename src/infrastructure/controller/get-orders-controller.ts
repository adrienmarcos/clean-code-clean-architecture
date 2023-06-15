import { GetOrders } from '../../application/query/get-orders/get-orders'
import { Connection } from '../database/connection'

export class GetOrdersController {
  readonly connection: Connection

  constructor (connection: Connection) {
    this.connection = connection
  }

  async execute (params: any, body: any): Promise<any> {
    const getOrders = new GetOrders(this.connection)
    const getOrdersOutput = await getOrders.execute()
    return getOrdersOutput
  }
}
