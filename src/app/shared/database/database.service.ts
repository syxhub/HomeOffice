import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '@firebase/auth-types';


@Injectable()
export class DatabaseService {

  constructor(private db: AngularFireDatabase) { }

  createDatabaseForUser(uid: string, userName: string) {
    const user = this.db.object('users/' + uid);
    user.set({ name: userName });
  }

}
