import { PlaceOrder } from '../../src/application/usecase/place-order'
import { CouponRepositoryMemory } from '../../src/infrastructure/repository/memory/coupon-repository-memory'
import { ItemRepositoryMemory } from '../../src/infrastructure/repository/memory/item-repository-memory'
import { OrderRepositoryMemory } from '../../src/infrastructure/repository/memory/order-repository-memory'

describe('Place Order', () => {
  test('Should place an Order if valid data is provided', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
    const couponRepository = new CouponRepositoryMemory()
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
    const input = {
      cpf: '839.435.452-10',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 1 }
      ],
      date: new Date('2023-1-16'),
      coupon: 'Vale20'
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(72)
  })
})
