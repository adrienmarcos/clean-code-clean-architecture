import { OrderDAO } from '../../dao/order-dao'
import { GetOrdersOutput } from './get-orders-output'

export class GetOrders {
  readonly orderDAO: OrderDAO

  constructor (orderDAO: OrderDAO) {
    this.orderDAO = orderDAO
  }

  async execute (): Promise<GetOrdersOutput> {
    const ordersData = await this.orderDAO.findAll()
    const getOrdersOutput = new GetOrdersOutput()
    for (const orderData of ordersData) {
      getOrdersOutput.addOrder(orderData.code, orderData.total)
    }
    return getOrdersOutput
  }
}
