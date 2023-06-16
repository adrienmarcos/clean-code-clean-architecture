import { OrderDAO } from '../../application/dao/order-dao'
import { GetOrders } from '../../application/query/get-orders/get-orders'

export class GetOrdersController {
  readonly orderDAO: OrderDAO

  constructor (orderDAO: OrderDAO) {
    this.orderDAO = orderDAO
  }

  async execute (params: any, body: any): Promise<any> {
    const getOrders = new GetOrders(this.orderDAO)
    const getOrdersOutput = await getOrders.execute()
    return getOrdersOutput
  }
}
