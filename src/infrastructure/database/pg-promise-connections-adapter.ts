import pgPromise from 'pg-promise'
import { Connection } from './connection'

export class PgPromiseConnectionAdapter implements Connection {
  pgPromise: any

  constructor () {
    this.pgPromise = pgPromise()('postgres://postgres:root@localhost:5432/ccca')
  }

  async query (statement: string, params: any[]): Promise<any> {
    return this.pgPromise.query(statement, params)
  }
}
