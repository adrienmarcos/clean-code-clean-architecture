import { Order } from '../entity/order'

export interface OrderRepository {
  save(order: Order): Promise<void>
  findByCpf(cpf: string): Promise<Order | Order[] | undefined>
  delete(order: Order): Promise<void>
  count(): Promise<number>
  clear(): Promise<void>
}
