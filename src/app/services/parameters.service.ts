import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  private dbPath = '/parameters';
  parametersRef: AngularFireList<any> = null;
  
  constructor(private db: AngularFireDatabase) {
    this.parametersRef = db.list(this.dbPath);
   }

  getParameterList(): AngularFireList<any> {
    return this.parametersRef;
  }

  createParameter(parameter) {
    const itemsRef = this.db.list('parameters');
    itemsRef.push({ name: parameter });
  }
  deleteParameter(key) {
    return this.parametersRef.remove(key);
  }
}
