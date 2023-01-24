import { PgPromiseConnectionAdapter } from '../../src/infrastructure/database/pg-promise-connections-adapter'

describe('Database Connection', () => {
  test('Should create a connection to the Database', async () => {
    const connection = new PgPromiseConnectionAdapter()
    const itemsData = await connection.query('Select * from ccca.tb_item', [])
    console.log(itemsData)
    expect(itemsData).toHaveLength(6)
  })
})
