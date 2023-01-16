import Coupon from './coupon'
import Cpf from './cpf'
import Item from './item'
import OrderItem from './order-item'

export default class Order {
  readonly cpf: Cpf
  readonly orderItems: OrderItem[]
  readonly date: Date
  private coupon: Coupon | undefined

  constructor (cpf: string, date: Date = new Date()) {
    this.cpf = new Cpf(cpf)
    this.orderItems = []
    this.date = date
  }

  getTotal (): number {
    const total = this.orderItems.reduce((acc, orderItem) => acc + orderItem.getTotal(), 0)
    if (!this.coupon) return total
    return total - this.coupon.applyDiscount(total)
  }

  getQuantity (): number {
    return this.orderItems.length
  }

  getCpf (): Cpf {
    return this.cpf
  }

  addItem (item: Item, quantity: number): void {
    this.orderItems.push(new OrderItem(item.id, item.price, quantity))
  }

  addCoupon (coupon: Coupon): void {
    if (!coupon.isValid(this.date)) return
    this.coupon = coupon
  }
}
