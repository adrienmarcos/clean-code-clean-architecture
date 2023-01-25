import { RepositoryFactory } from '../../domain/factory/repository-factory'
import { CouponRepository } from '../../domain/repository/coupon-repository'
import { ItemRepository } from '../../domain/repository/item-repository'
import { OrderRepository } from '../../domain/repository/order-repository'
import { CouponRepositoryMemory } from '../repository/memory/coupon-repository-memory'
import { ItemRepositoryMemory } from '../repository/memory/item-repository-memory'
import { OrderRepositoryMemory } from '../repository/memory/order-repository-memory'

export class MemoryRepositoryFactory implements RepositoryFactory {
  createItemRepository (): ItemRepository {
    return new ItemRepositoryMemory()
  }

  createOrderRepository (): OrderRepository {
    return new OrderRepositoryMemory()
  }

  createCouponRepository (): CouponRepository {
    return new CouponRepositoryMemory()
  }
}
