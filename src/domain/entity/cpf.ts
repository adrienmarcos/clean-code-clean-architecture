export default class Cpf {
  readonly value: string

  constructor (value: string) {
    if (!this.validate(value)) throw new Error('Invalid Cpf')
    this.value = value
  }

  getValue (): string {
    return this.value
  }

  validate (value: string): boolean {
    if (!value) return false
    value = this.clean(value)
    if (!this.hasMinimumLength(value)) return false
    if (this.isBlocked(value)) return false
    const digit1 = this.calculateDigit(value, 10)
    const digit2 = this.calculateDigit(value, 11)
    const calculatedDigit = `${digit1}${digit2}`
    const actualDigit = value.slice(9)
    return actualDigit === calculatedDigit
  }

  calculateDigit (value: string, factor: number): number {
    let total = 0
    for (const digit of value) {
      if (factor > 1) {
        total += parseInt(digit) * factor--
      }
    }
    const rest = total % 11
    return (rest < 2) ? 0 : 11 - rest
  }

  isBlocked (value: string): boolean {
    const [firstDigit] = value
    return [...value].every((digit) => digit === firstDigit)
  }

  clean (value: string): string {
    return value.replace(/\D/g, '')
  }

  hasMinimumLength (value: string): boolean {
    return value.length === 11
  }
}
