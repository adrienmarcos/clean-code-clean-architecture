import { PgPromiseConnectionAdapter } from '../../src/infrastructure/database/pg-promise-connections-adapter'

describe('Database Connection', () => {
  test('Should create a connection to the Database', async () => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    const itemsData = await connection.query('Select * from ccca.tb_item', [])
    expect(itemsData).toHaveLength(6)
  })
})
