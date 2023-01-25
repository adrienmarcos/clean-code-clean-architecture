import { CouponRepository } from '../repository/coupon-repository'
import { ItemRepository } from '../repository/item-repository'
import { OrderRepository } from '../repository/order-repository'

export interface RepositoryFactory {
  createItemRepository(): ItemRepository
  createOrderRepository(): OrderRepository
  createCouponRepository(): CouponRepository
}
