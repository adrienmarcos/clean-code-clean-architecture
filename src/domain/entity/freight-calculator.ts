import { Item } from './item'

export interface FreightCalculator {
  calculate(item: Item): number
}
