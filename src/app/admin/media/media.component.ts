import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  imgSrc: string;
  selectedImage: any = null;
  isSubmited: boolean = false;
  imageList: any[];
  progressBar = null;

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required)
  })

  constructor(private storage: AngularFireStorage, private imageService: ImageService) { }

  ngOnInit(): void {
    this.resetForm();
    this.imageService.imageDetailsList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(res => {
      this.imageList = res;
    })
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }
  onSubmit(formValue) {
    this.isSubmited = true;
    if (this.formTemplate.valid) {
      var filePath = `images/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            const fileName = (filePath.split('/').slice(1, 2));
            formValue['imageUrl'] = url;
            this.imageService.insertImageDetails(formValue, fileName);
            this.resetForm();
          })
        })
      ).subscribe(res => {
        this.progressBar = (res.bytesTransferred / res.totalBytes) * 100 ; 
        if(this.progressBar === 100) {
          this.progressBar = null;
        }  
      });
      
    }
  }
  get formControls() {
    return this.formTemplate['controls']
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl: ''
    })
    this.imgSrc = '';
    this.selectedImage = null;
    this.isSubmited = false;
  }
  delete(image) {  
    var fileRef = this.storage.ref(`/images/${image.fileName}`);
    fileRef.delete();
    this.imageService.deleteImage(image.key); 
  }
}
