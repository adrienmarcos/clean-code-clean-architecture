import FreightCalculator from './freight-calculator'
import Item from './item'

export default class FixedFreightCalculator implements FreightCalculator {
  calculate (item: Item): number {
    return 10
  }
}
