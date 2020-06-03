import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from 'src/app/services/products.service';
import { DialogService } from 'src/app/services/dialog.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  product;
  dataSource ;
  displayedColumns: string[] = ['img', 'name', 'category', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private productService: ProductsService, private dialogService: DialogService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProductsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
    });   
  }

  deleteProduct(key) {
    this.dialogService.openConfirmDialog('Czy jesteś piewien, że chcesz usunąć ten produkt?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.productService.deleteProduct(key);
      }
    });   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  createProduct() {
    this.router.navigate(['admin/add-product'])
  }

}
