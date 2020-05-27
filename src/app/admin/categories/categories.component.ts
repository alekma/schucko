import { Component, OnInit, ViewChild  } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categorie: string = '';
  categories;
  dataSource ;
  displayedColumns: string[] = ['name', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private categoriesService: CategoriesService, private dialogService: DialogService) {
  }

  
  ngOnInit(): void {
    this.categoriesService.getCategoriesList().snapshotChanges().pipe(
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

  deleteCategorie(key) {
    this.dialogService.openConfirmDialog('Czy jesteś piewien, że chcesz usunąć ten rekord?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.categoriesService.deleteCategorie(key);
      }
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
 
}
