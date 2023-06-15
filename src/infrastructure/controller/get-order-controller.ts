import { GetOrder } from '../../application/query/get-order/get-order'
import { Connection } from '../database/connection'

export class GetOrderController {
  readonly connection: Connection

  constructor (connection: Connection) {
    this.connection = connection
  }

  async execute (params: any, body: any): Promise<any> {
    const getOrder = new GetOrder(this.connection)
    const getOrderOutput = await getOrder.execute(params.code)
    return getOrderOutput
  }
}
