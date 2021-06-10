import {DefaultCrudRepository} from '@loopback/repository';
import {AuditDataSource} from '../datasources';
import {Student, StudentRelations} from '../models';
import {repository} from '@loopback/repository';
import {inject, Getter, Constructor} from '@loopback/core';
import {AuthenticationBindings, IAuthUser} from 'loopback4-authentication';
import {AuditRepositoryMixin, IAuditMixinOptions} from '@sourceloop/audit-log';
import {AuditLogRepository} from './audit-log.repository';
import {AuditDbSourceName} from '@sourceloop/audit-log';

const studentAuditOpts: IAuditMixinOptions = {
  actionKey: 'Student_Logs',
};

export class StudentRepository extends AuditRepositoryMixin<
  Student,
  typeof Student.prototype.id,
  StudentRelations,
  string,
  Constructor<
    DefaultCrudRepository<
      Student,
      typeof Student.prototype.id,
      StudentRelations
    >
  >
>(DefaultCrudRepository, studentAuditOpts) {
  constructor(
    @inject(`datasources.${AuditDbSourceName}`) dataSource: AuditDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<IAuthUser>,
    @repository.getter('AuditLogRepository')
    public getAuditLogRepository: Getter<AuditLogRepository>,
  ) {
    super(Student, dataSource, getCurrentUser);
  }
}
