import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AddProductComponent } from './admin/products/add-product/add-product.component';
import { ProductsListComponent } from './admin/products/products-list/products-list.component';
import { ParametersComponent } from './admin/parameters/parameters.component';
import { MediaComponent } from './admin/media/media.component';



const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'add-product', component: AddProductComponent},
      { path: 'product-list', component: ProductsListComponent},
      { path: 'parameters', component: ParametersComponent},
      { path: 'media', component: MediaComponent}    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
