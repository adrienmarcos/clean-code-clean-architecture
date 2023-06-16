import { OrderDAO } from '../../application/dao/order-dao'
import { GetOrder } from '../../application/query/get-order/get-order'

export class GetOrderController {
  readonly orderDAO: OrderDAO

  constructor (orderDAO: OrderDAO) {
    this.orderDAO = orderDAO
  }

  async execute (params: any, body: any): Promise<any> {
    const getOrder = new GetOrder(this.orderDAO)
    const getOrderOutput = await getOrder.execute(params.code)
    return getOrderOutput
  }
}
