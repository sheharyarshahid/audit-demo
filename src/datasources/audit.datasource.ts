import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {AuditDbSourceName} from '@sourceloop/audit-log';

const config = {
  name: 'Audit',
  connector: 'postgresql',
  url: 'postgres://postgres:pgadmin@localhost/Smiels_DB',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'pgadmin',
  database: 'Smiels_DB',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AuditDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = AuditDbSourceName;
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Audit', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
