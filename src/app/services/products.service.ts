import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dbPath = '/products';
  productsRef: AngularFireList<any> = null;
  
  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
   }

   getProductsList(): AngularFireList<any> {
    return this.productsRef;
  }
  createProduct(product) {
    this.db.list('products').push(product);   
  }
  deleteProduct(key) {
    return this.productsRef.remove(key);
  }
}
