import { Connection } from '../../../infrastructure/database/connection'
import { GetOrdersOutput } from './get-orders-output'

export class GetOrders {
  readonly connection: Connection

  constructor (connection: Connection) {
    this.connection = connection
  }

  async execute (): Promise<GetOrdersOutput> {
    const ordersData = await this.connection.query('Select code, total::float from ccca.tb_order', [])
    const getOrdersOutput = new GetOrdersOutput()
    for (const orderData of ordersData) {
      getOrdersOutput.addOrder(orderData.code, orderData.total)
    }
    return getOrdersOutput
  }
}
