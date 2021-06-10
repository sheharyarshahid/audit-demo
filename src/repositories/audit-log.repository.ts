import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AuditDataSource} from '../datasources';
import {AuditLog, AuditLogRelations} from '../models';
import {AuditDbSourceName} from '@sourceloop/audit-log';

export class AuditLogRepository extends DefaultCrudRepository<
  AuditLog,
  typeof AuditLog.prototype.id,
  AuditLogRelations
> {
  constructor(
    @inject(`datasources.${AuditDbSourceName}`) dataSource: AuditDataSource,
  ) {
    super(AuditLog, dataSource);
  }
}
