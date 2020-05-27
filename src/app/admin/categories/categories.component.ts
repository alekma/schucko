import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/models/categories';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  categorie: string = '';
  categories;
  dataSource ;
  displayedColumns: string[] = ['name', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private categoriesService: CategoriesService) {


  }

  ngOnInit(): void {
    this.categoriesService.getCategoriesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(res => {
      this.dataSource = new MatTableDataSource<Categorie>(res);
      this.dataSource.paginator = this.paginator;
    });   
    
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  createCategorie() {
    if (this.categorie) {
      this.categoriesService.createCategories(this.categorie);
      this.categorie = ''
    }
  }
  ngAfterViewInit() {

  }
}
