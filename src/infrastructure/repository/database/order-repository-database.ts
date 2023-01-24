import { Order } from '../../../domain/entity/order'
import { OrderRepository } from '../../../domain/repository/order-repository'
import { Connection } from '../../database/connection'

export class OrderRepositoryDatabase implements OrderRepository {
  readonly connection: Connection

  constructor (connection: Connection) {
    this.connection = connection
  }

  async clear (): Promise<void> {
    await this.connection.query('Delete from ccca.tb_order_item', [])
    await this.connection.query('Delete from ccca.tb_order', [])
  }

  async save (order: Order): Promise<void> {
    const [orderData] = await this.connection.query(`INSERT INTO ccca.tb_order(code, cpf, issue_date, freight, sequence, coupon) 
      VALUES($1, $2, $3, $4, $5, $6) returning *`, [order.getCode(), order.getCpf(), order.date, order.getFreight(), order.sequence, order.getCoupon()])
    for (const orderItem of order.getOrderItems()) {
      await this.connection.query(`INSERT INTO ccca.tb_order_item(id, id_item, price, quantity)
        VALUES($1, $2, $3, $4)`, [orderItem.idItem, orderData.id, orderItem.price, orderItem.quantity])
    }
  }

  async findByCpf (cpf: string): Promise<Order | Order[] | undefined> {
    throw new Error('Method not implemented.')
  }

  async delete (order: Order): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async count (): Promise<number> {
    const [orderData] = await this.connection.query('Select count(*)::int as count from ccca.tb_order', [])
    return orderData.count
  }
}
