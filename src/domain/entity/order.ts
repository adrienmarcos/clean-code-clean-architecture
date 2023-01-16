import Coupon from './coupon'
import Cpf from './cpf'
import DefaultFreightCalculator from './default-freight-calculator'
import FreightCalculator from './freight-calculator'
import Item from './item'
import OrderItem from './order-item'

export default class Order {
  readonly cpf: Cpf
  readonly orderItems: OrderItem[]
  readonly date: Date
  private coupon: Coupon | undefined
  private freight: number
  readonly freightCalculator: FreightCalculator

  constructor (cpf: string, date: Date = new Date(), freightCalculator: FreightCalculator = new DefaultFreightCalculator()) {
    this.cpf = new Cpf(cpf)
    this.orderItems = []
    this.date = date
    this.freight = 0
    this.freightCalculator = freightCalculator
  }

  getTotal (): number {
    const total = this.orderItems.reduce((acc, orderItem) => acc + orderItem.getTotal(), 0)
    if (!this.coupon) return total
    return total - this.coupon.calculateDiscount(total)
  }

  getQuantity (): number {
    if (!this.orderItems.length) return 0
    return this.orderItems.reduce((acc, orderItem) => acc + orderItem.quantity, 0)
  }

  getCpf (): Cpf {
    return this.cpf
  }

  getFreight (): number {
    return this.freight
  }

  addItem (item: Item, quantity: number): void {
    this.freight += this.freightCalculator.calculate(item) * quantity
    this.orderItems.push(new OrderItem(item.id, item.price, quantity))
  }

  addCoupon (coupon: Coupon): void {
    if (!coupon.isValid(this.date)) return
    this.coupon = coupon
  }
}
