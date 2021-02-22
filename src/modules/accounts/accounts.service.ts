import { Inject, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Model } from 'mongoose';

import MongodbGateway from 'src/database/gateways/mongodb';
import { constant } from 'src/utils';
import { Account } from './accounts.model';

@Injectable()
export class AccountsService extends MongodbGateway<Account, string> {
  constructor(
    @Inject(constant.Schema.ACCOUNT_MODEL)
    private accountModel: Model<Account>,
  ) {
    super();
  }

  getAll(): Observable<Account[]> {
    return from(this.accountModel.find().exec()); // get all account
  }
  getById(id: string): Observable<Account> {
    throw new Error('Method not implemented.');
  }
  getBy(param: string): Observable<Account[]> {
    throw new Error('Method not implemented.');
  }
  create(param: Account): Observable<Account> {
    return from(this.accountModel.create(param)); // create account
  }
  delete(id: string): Observable<Account> {
    throw new Error('Method not implemented.');
  }
  update(param: Account): Observable<Account> {
    throw new Error('Method not implemented.');
  }
}