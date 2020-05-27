import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private dbPath = '/categories';
  categorieRef: AngularFireList<any> = null;

  

  constructor(private db: AngularFireDatabase) { 
    this.categorieRef = db.list(this.dbPath);
  }

  

  getCategoriesList(): AngularFireList<any> {
    return this.categorieRef;
  }

  createCategories(categorie) {
    const itemsRef = this.db.list('categories');
    itemsRef.push({ name: categorie });
  }
  deleteCategorie(key) {
    return this.categorieRef.remove(key);
  }
}
