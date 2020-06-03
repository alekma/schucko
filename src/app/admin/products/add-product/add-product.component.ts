import { Component, OnInit } from '@angular/core';
import { ParametersService } from 'src/app/services/parameters.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MediaComponent } from '../../media/media.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  parameter: any[];
  categories: any[];  

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imgUrl: new FormControl('', Validators.required),
    para: new FormGroup({
    })
  })

  constructor(private parameters: ParametersService, public dialog: MatDialog, private categorySrv: CategoriesService, private productSrv: ProductsService, private router: Router, private route: ActivatedRoute) {
    this.parameters.getParameterList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(res => {
      this.parameter = res;
      this.parameter.forEach(element => {
        (this.form.get('para') as FormGroup).addControl(element.name, new FormControl(''))
      });
    });
    this.categorySrv.getCategoriesList().valueChanges().subscribe(res => this.categories = res)
  }

  openDialog() {
    const dialogRef = this.dialog.open(MediaComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.form.get('imgUrl').setValue(result.imageUrl)
      }
      
    });
  }

  onSubmit(form) {
    this.productSrv.createProduct(form);
    this.router.navigate(['admin/product-list'])
  }
  catChange(value) {
    this.form.get('category').setValue(value);
  }
}
