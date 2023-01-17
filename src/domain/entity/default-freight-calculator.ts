import { FreightCalculator } from './freight-calculator'
import { Item } from './item'

export class DefaultFreightCalculator implements FreightCalculator {
  calculate (item: Item): number {
    const freight = (1000 * item.getVolume() * (item.getDensity() / 100))
    return Math.max(10, freight)
  }
}
