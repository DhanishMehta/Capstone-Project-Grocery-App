import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { PageNotFoundComponent } from './pages/404/404.component';
import { UnauthorizedComponent } from './pages/403/403.component';
import { isLoggedIn } from 'src/auth/auth.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "shop",
    component: ShopComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    canActivate: [isLoggedIn]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [isLoggedIn]
  },
  {
    path: "404",
    component: PageNotFoundComponent
  },
  {
    path: "403",
    component: UnauthorizedComponent
  },
  {
    path: "**",
    redirectTo: "/404",
    pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
