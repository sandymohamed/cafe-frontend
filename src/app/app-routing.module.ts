import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './component/card/card.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { OrdersComponent } from './component/orders/orders.component';


import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component'
import { EditOrderComponent } from './component/edit-order/edit-order.component';
import { AddOrderComponent } from './component/add-order/add-order.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { AdminProfileComponent } from './products/admin-profile/admin-profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'card', component: CardComponent },
  { path: 'orders', component: OrdersComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {path: 'order/add',component:AddOrderComponent} ,
  { path: 'orders/edit', component: EditOrderComponent, pathMatch: 'full' },
  { path: 'adminprofile', component: AdminProfileComponent },
  { path: 'products', component: ProductsListComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
