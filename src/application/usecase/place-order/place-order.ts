import { DefaultFreightCalculator } from '../../../domain/entity/default-freight-calculator'
import { Order } from '../../../domain/entity/order'
import { RepositoryFactory } from '../../../domain/factory/repository-factory'
import { CouponRepository } from '../../../domain/repository/coupon-repository'
import { ItemRepository } from '../../../domain/repository/item-repository'
import { OrderRepository } from '../../../domain/repository/order-repository'
import { PlaceOrderInput } from './place-order-input'
import { PlaceOrderOutput } from './place-order-output'

export class PlaceOrder {
  readonly itemRepository: ItemRepository
  readonly orderRepository: OrderRepository
  readonly couponRepository: CouponRepository

  constructor (repositoryFactory: RepositoryFactory) {
    this.itemRepository = repositoryFactory.createItemRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
    this.couponRepository = repositoryFactory.createCouponRepository()
  }

  async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = await this.orderRepository.count() + 1
    const order = new Order(input.cpf, input.date, new DefaultFreightCalculator(), sequence)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem)
      if (!item) throw new Error('Item not found')
      order.addItem(item, orderItem.quantity)
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.findByCode(input.coupon)
      if (coupon) order.addCoupon(coupon)
    }
    await this.orderRepository.save(order)
    return new PlaceOrderOutput(order.getCode(), order.getTotal())
  }
}
