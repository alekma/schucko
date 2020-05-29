import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './admin/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatConfirmDialogComponent } from './admin/mat-confirm-dialog/mat-confirm-dialog.component';
import { AddProductComponent } from './admin/products/add-product/add-product.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ProductsListComponent } from './admin/products/products-list/products-list.component';
import { ParametersComponent } from './admin/parameters/parameters.component';
import { MediaComponent } from './admin/media/media.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
    ProductsComponent,
    ProductComponent,
    CategoriesComponent,
    MatConfirmDialogComponent,
    AddProductComponent,
    AdminComponent,
    ProductsListComponent,
    ParametersComponent,
    MediaComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,    
    AngularFireDatabaseModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent]
})
export class AppModule { }
