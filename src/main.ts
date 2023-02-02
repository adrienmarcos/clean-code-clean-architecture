import { PlaceOrder } from './application/usecase/place-order/place-order'
import { SimulateFreight } from './application/usecase/simulate-freight/simulate-freigth'
import { DefaultFreightCalculator } from './domain/entity/default-freight-calculator'
import { PgPromiseConnectionAdapter } from './infrastructure/database/pg-promise-connections-adapter'
import { DatabaseRepositoryFactory } from './infrastructure/factory/database-repository-factory'
import { ItemRepositoryDatabase } from './infrastructure/repository/database/item-repository-database'
import ExpressAdapter from './infrastructure/http/express-adapter'

const expressAdapter = new ExpressAdapter()
expressAdapter.on('/orders', 'post', async (params: any, body: any) => {
  const placeOrder = new PlaceOrder(new DatabaseRepositoryFactory())
  const input = body
  input.date = new Date(input.date)
  return await placeOrder.execute(input)
})

expressAdapter.on('/simulateFreight', 'post', async (params: any, body: any) => {
  const itemRepository = new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
  const simulateFreight = new SimulateFreight(itemRepository, new DefaultFreightCalculator())
  const input = body
  return await simulateFreight.execute(input)
})

expressAdapter.listen(3000)
