import Express from 'express'
import { PlaceOrder } from './application/usecase/place-order/place-order'
import { SimulateFreight } from './application/usecase/simulate-freight/simulate-freigth'
import { DefaultFreightCalculator } from './domain/entity/default-freight-calculator'
import { PgPromiseConnectionAdapter } from './infrastructure/database/pg-promise-connections-adapter'
import { DatabaseRepositoryFactory } from './infrastructure/factory/database-repository-factory'
import { ItemRepositoryDatabase } from './infrastructure/repository/database/item-repository-database'

const app = Express()
app.use(Express.json())

app.post('/orders', async (req, res) => {
  const placeOrder = new PlaceOrder(new DatabaseRepositoryFactory())
  const input = req.body
  input.date = new Date(input.date)
  const output = await placeOrder.execute(input)
  res.json(output)
})

app.post('/simulateFreight', async (req, res) => {
  const itemRepository = new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
  const simulateFreight = new SimulateFreight(itemRepository, new DefaultFreightCalculator())
  const input = req.body
  const output = await simulateFreight.execute(input)
  res.json(output)
})

app.listen(3000)
