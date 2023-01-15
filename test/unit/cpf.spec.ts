import Cpf from '../../src/domain/entity/cpf'

describe('Cpf Entity', () => {
  test('Should validate a Cpf if valid data is provided', () => {
    const cpf = new Cpf('935.411.347-80')
    expect(cpf).toBeTruthy()
  })

  test('Should throw an Error if invalid data is provided', () => {
    expect(() => new Cpf('123.456.789-99')).toThrow(new Error('Invalid Cpf'))
  })

  test('Should throw an Error if all numbers provided are the same', () => {
    expect(() => new Cpf('111.111.111-11')).toThrow(new Error('Invalid Cpf'))
  })

  test('Should throw an Error if numbers provided are bigger than maximum length', () => {
    expect(() => new Cpf('123.456.789-1000')).toThrow(new Error('Invalid Cpf'))
  })

  test('Should throw an Error if numbers provided are less than minimum length', () => {
    expect(() => new Cpf('123.456')).toThrow(new Error('Invalid Cpf'))
  })
})
