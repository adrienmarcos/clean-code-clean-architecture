import { Order } from '../../../domain/entity/order'
import { OrderRepository } from '../../../domain/repository/order-repository'

export class OrderRepositoryMemory implements OrderRepository {
  private orders: Order[]

  constructor () {
    this.orders = []
  }

  async clear (): Promise<void> {
    this.orders = []
  }

  async count (): Promise<number> {
    return await new Promise<number>((resolve, reject) => {
      resolve(this.orders.length)
    })
  }

  async save (order: Order): Promise<void> {
    if (!order) throw new Error('Order not valid')
    this.orders.push(order)
  }

  async findByCpf (cpf: string): Promise<Order | Order[] | undefined> {
    if (!cpf) throw new Error('Cpf not valid')
    return this.orders.find((order) => order.getCpf() === cpf)
  }

  async delete (orderToBeRemoved: Order): Promise<void> {
    const order = this.orders.find((order) => order.getCpf() === orderToBeRemoved.getCpf())
    if (!order) throw new Error('Order not found')
    this.orders = this.orders.filter((order) => order.getCpf() !== orderToBeRemoved.getCpf())
  }
}
