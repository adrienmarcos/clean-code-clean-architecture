import { Coupon } from '../../../domain/entity/coupon'
import { CouponRepository } from '../../../domain/repository/coupon-repository'
import { Connection } from '../../database/connection'

export class CouponRepositoryDatabase implements CouponRepository {
  connection: Connection

  constructor (connection: Connection) {
    this.connection = connection
  }

  async findByCode (code: string): Promise<Coupon | undefined> {
    const [couponData] = await this.connection.query('Select * from ccca.tb_coupon where code = $1', [code])
    if (!couponData) throw new Error('Coupon not found')
    return new Coupon(couponData.code, couponData.percentage, couponData.expire_date)
  }

  async save (coupon: Coupon): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete (coupon: Coupon): Promise<void> {
    const [couponData] = await this.connection.query('Select * from ccca.tb_coupon where code = $1', [coupon.code])
    if (!couponData) throw new Error('Coupon not found')
    await this.connection.query('Delete from ccca.tb_coupon where code = $1', [coupon.code])
  }
}
