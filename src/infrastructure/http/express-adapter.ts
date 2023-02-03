import Express from 'express'
import { Http } from './http'

export class ExpressAdapter implements Http {
  private readonly app: any

  constructor () {
    this.app = Express()
    this.app.use(Express.json())
  }

  on (url: string, method: string, fn: any): void {
    this.app[method](url, async (req: any, res: any) => {
      const output = await fn(req.params, req.body)
      res.json(output)
    })
  }

  listen (port: number): void {
    this.app.listen(port)
  }
}
