import { SimulateFreightInput } from '../../src/application/usecase/simulate-freight/simulate-freight-input'
import { SimulateFreight } from '../../src/application/usecase/simulate-freight/simulate-freigth'
import { DefaultFreightCalculator } from '../../src/domain/entity/default-freight-calculator'
import { PgPromiseConnectionAdapter } from '../../src/infrastructure/database/pg-promise-connections-adapter'
import { ItemRepositoryDatabase } from '../../src/infrastructure/repository/database/item-repository-database'

describe('Simulate Freight', () => {
  test('Should simulate the freight of items', async () => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    const itemRepository = new ItemRepositoryDatabase(connection)
    const freightCalculator = new DefaultFreightCalculator()
    const simulateFreight = new SimulateFreight(itemRepository, freightCalculator)
    const input = new SimulateFreightInput([
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 }
    ])
    const output = await simulateFreight.execute(input)
    expect(output.amount).toBe(260)
  })
})
