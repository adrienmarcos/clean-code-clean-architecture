export default class Item {
  readonly id: number
  readonly category: string
  readonly description: string
  readonly price: number
  readonly width: number
  readonly height: number
  readonly length: number
  readonly weight: number

  constructor (id: number, category: string, description: string, price: number, width: number = 0,
    height: number = 0, length: number = 0, weight: number = 0) {
    this.id = id
    this.category = category
    this.description = description
    this.price = price
    this.width = width
    this.height = height
    this.length = length
    this.weight = weight
  }

  getVolume (): number {
    return (this.width / 100) * (this.height / 100) * (this.length / 100)
  }

  getDensity (): number {
    return this.weight / this.getVolume()
  }
}
