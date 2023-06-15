import { Connection } from '../../infrastructure/database/connection'
import { GetOrderOutput } from './get-order-output'

export class GetOrder {
  readonly connection: Connection

  constructor (connection: Connection) {
    this.connection = connection
  }

  async execute (code: string): Promise<GetOrderOutput> {
    const [orderData] = await this.connection.query('Select code, total::float from ccca.tb_order where code = $1', [code])
    return new GetOrderOutput(orderData.code, orderData.total)
  }
}
