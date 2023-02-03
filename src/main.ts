/* eslint-disable no-new */
import { DatabaseRepositoryFactory } from './infrastructure/factory/database-repository-factory'
import { ExpressAdapter } from './infrastructure/http/express-adapter'
import { RouteConfig } from './infrastructure/http/route-config'

const expressAdapter = new ExpressAdapter()
new RouteConfig(expressAdapter, new DatabaseRepositoryFactory())

expressAdapter.listen(3000)
