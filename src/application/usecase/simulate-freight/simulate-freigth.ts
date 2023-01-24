import { FreightCalculator } from '../../../domain/entity/freight-calculator'
import { ItemRepository } from '../../../domain/repository/item-repository'
import { SimulateFreightInput } from './simulate-freight-input'
import { SimulateFreightOutput } from './simulate-freigth-output'

export class SimulateFreight {
  readonly itemRepository: ItemRepository
  readonly freightCalculator: FreightCalculator

  constructor (itemRepository: ItemRepository, freightCalculator: FreightCalculator) {
    this.itemRepository = itemRepository
    this.freightCalculator = freightCalculator
  }

  async execute (input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    let amount = 0
    for (const inputItem of input.items) {
      const item = await this.itemRepository.findById(inputItem.idItem)
      if (!item) throw new Error('Item not found')
      amount += this.freightCalculator.calculate(item) * inputItem.quantity
    }
    return new SimulateFreightOutput(amount)
  }
}
