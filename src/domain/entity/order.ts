export default class Order {
  private cpf: string

  constructor (cpf: string) {
    this.cpf = cpf
  }

  getTotal (): number {
    return 0
  }

  getCpf (): string {
    return this.cpf
  }

  setCpf (cpf: string): void {
    this.cpf = cpf
  }
}
