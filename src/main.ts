/* eslint-disable no-new */
import { PgPromiseConnectionAdapter } from './infrastructure/database/pg-promise-connections-adapter'
import { DatabaseRepositoryFactory } from './infrastructure/factory/database-repository-factory'
import { ExpressAdapter } from './infrastructure/http/express-adapter'
import { RouteConfig } from './infrastructure/http/route-config'

const expressAdapter = new ExpressAdapter()
new RouteConfig(expressAdapter, new DatabaseRepositoryFactory(), PgPromiseConnectionAdapter.getInstance())

expressAdapter.listen(3000)
