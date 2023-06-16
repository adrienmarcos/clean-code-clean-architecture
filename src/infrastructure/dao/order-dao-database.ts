import { OrderDAO } from '../../application/dao/order-dao'
import { Connection } from '../database/connection'

export class OrderDAODatabase implements OrderDAO {
  readonly connection: Connection

  constructor (connection: Connection) {
    this.connection = connection
  }

  async get (code: string): Promise<any> {
    return await this.connection.query('Select code, total::float from ccca.tb_order where code = $1', [code])
  }

  async findAll (): Promise<any> {
    return await this.connection.query('Select code, total::float from ccca.tb_order', [])
  }
}
