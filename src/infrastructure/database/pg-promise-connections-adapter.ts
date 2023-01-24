import pgPromise from 'pg-promise'
import { Connection } from './connection'

export class PgPromiseConnectionAdapter implements Connection {
  pgPromise: any
  static instance: PgPromiseConnectionAdapter

  private constructor () {
    this.pgPromise = pgPromise()('postgres://postgres:root@localhost:5432/ccca')
  }

  static getInstance (): PgPromiseConnectionAdapter {
    if (!PgPromiseConnectionAdapter.instance) PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter()
    return PgPromiseConnectionAdapter.instance
  }

  async query (statement: string, params: any[]): Promise<any> {
    return this.pgPromise.query(statement, params)
  }
}
