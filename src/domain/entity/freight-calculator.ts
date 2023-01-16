import Item from './item'

export default interface FreightCalculator {
  calculate: (item: Item) => number
}
