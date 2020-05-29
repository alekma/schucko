import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailsList: AngularFireList<any>

  constructor(private firebase: AngularFireDatabase) { }

  getImageDetailList() {
    this.imageDetailsList = this.firebase.list('images');
  }

  insertImageDetails(imageDetails, fileName) {
    this.imageDetailsList.push({
      imageUrl: imageDetails.imageUrl,
      fileName: fileName[0]
    })
  }
  deleteImage(key) {
    this.firebase.list('images').remove(key);
  }
}
