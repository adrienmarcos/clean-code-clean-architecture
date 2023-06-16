import { OrderDAO } from '../../dao/order-dao'
import { GetOrderOutput } from './get-order-output'

export class GetOrder {
  readonly orderDAO: OrderDAO

  constructor (orderDAO: OrderDAO) {
    this.orderDAO = orderDAO
  }

  async execute (code: string): Promise<GetOrderOutput> {
    const [orderData] = await this.orderDAO.get(code)
    return new GetOrderOutput(orderData.code, orderData.total)
  }
}
