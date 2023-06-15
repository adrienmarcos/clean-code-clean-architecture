import { Coupon } from '../../../domain/entity/coupon'
import { DefaultFreightCalculator } from '../../../domain/entity/default-freight-calculator'
import { Item } from '../../../domain/entity/item'
import { Order } from '../../../domain/entity/order'
import { OrderRepository } from '../../../domain/repository/order-repository'
import { Connection } from '../../database/connection'

export class OrderRepositoryDatabase implements OrderRepository {
  readonly connection: Connection

  constructor (connection: Connection) {
    this.connection = connection
  }

  async findAll (): Promise<Order[]> {
    const orders: Order[] = []
    const ordersData = await this.connection.query('Select * from ccca.tb_order', [])
    for (const orderData of ordersData) {
      const order = await this.get(orderData.code)
      orders.push(order)
    }
    return orders
  }

  async get (code: string): Promise<Order> {
    const [orderData] = await this.connection.query('Select * from ccca.tb_order where code = $1', [code])
    if (!orderData) throw new Error('Order not found')
    const order = new Order(orderData.cpf, orderData.issue_date, new DefaultFreightCalculator())
    const orderItemsData = await this.connection.query('Select * from ccca.tb_order_item where id_item = $1', [orderData.id])
    for (const orderItemData of orderItemsData) {
      const [itemData] = await this.connection.query('Select * from ccca.tb_item where id = $1', [orderItemData.id])
      const item = new Item(itemData.id_item, itemData.category, itemData.description, parseFloat(orderItemData.price), itemData.width, itemData.height, itemData.length, itemData.weight)
      order.addItem(item, orderItemData.quantity)
    }
    if (orderData.coupon) {
      const [couponData] = await this.connection.query('Select * from ccca.tb_coupon where code = $1', [orderData.coupon])
      const coupon = new Coupon(couponData.code, parseInt(couponData.percentage), couponData.expire_date)
      order.addCoupon(coupon)
    }
    return order
  }

  async clear (): Promise<void> {
    await this.connection.query('Delete from ccca.tb_order_item', [])
    await this.connection.query('Delete from ccca.tb_order', [])
  }

  async save (order: Order): Promise<void> {
    const [orderData] = await this.connection.query(`INSERT INTO ccca.tb_order(code, cpf, issue_date, freight, sequence, coupon, total) 
      VALUES($1, $2, $3, $4, $5, $6, $7) returning *`, [order.getCode(), order.getCpf(), order.date, order.getFreight(), order.sequence, order.getCoupon(), order.getTotal()])
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
