import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/services/dialog.service';
import { ParametersService } from 'src/app/services/parameters.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {
  parameter: string = '';
  categories;
  dataSource ;
  displayedColumns: string[] = ['name', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private parameterService: ParametersService, private dialogService: DialogService) { }

  ngOnInit(): void {

    this.parameterService.getParameterList().snapshotChanges().pipe(
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
  deleteParameter(key) {
    this.dialogService.openConfirmDialog('Czy jesteś piewien, że chcesz usunąć ten rekord?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.parameterService.deleteParameter(key);
      }
    });   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createParameter() {
    if (this.parameter) {
      this.parameterService.createParameter(this.parameter);
      this.parameter = ''
    }
  }
}
