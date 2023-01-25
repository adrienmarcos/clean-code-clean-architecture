import { RepositoryFactory } from '../../domain/factory/repository-factory'
import { CouponRepository } from '../../domain/repository/coupon-repository'
import { ItemRepository } from '../../domain/repository/item-repository'
import { OrderRepository } from '../../domain/repository/order-repository'
import { PgPromiseConnectionAdapter } from '../database/pg-promise-connections-adapter'
import { CouponRepositoryDatabase } from '../repository/database/coupon-repository-database'
import { ItemRepositoryDatabase } from '../repository/database/item-repository-database'
import { OrderRepositoryDatabase } from '../repository/database/order-repository-database'

export class DatabaseRepositoryFactory implements RepositoryFactory {
  createItemRepository (): ItemRepository {
    return new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
  }

  createOrderRepository (): OrderRepository {
    return new OrderRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
  }

  createCouponRepository (): CouponRepository {
    return new CouponRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
  }
}
