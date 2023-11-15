;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { CartMenuComponent } from './components/cart-menu/cart-menu.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { SliderAreaComponent } from './components/slider-area/slider-area.component';
import { BannerAreaComponent } from './components/banner-area/banner-area.component';
import { ProductTabComponent } from './components/product-tab/product-tab.component';
import { FeatureAreaComponent } from './components/feature-area/feature-area.component';
import { FooterAreaComponent } from './components/footer-area/footer-area.component';
import { WishlistModalComponent } from './components/modal/wishlist-modal/wishlist-modal.component';
import { AddToCartModalComponent } from './components/modal/add-to-cart-modal/add-to-cart-modal.component';
import { QuickViewModalComponent } from './components/modal/quick-view-modal/quick-view-modal.component';
import { ProductCardComponent } from './components/product-tab/product-card/product-card.component';
import { ModalComponent } from './components/modal/modal.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ShopComponent } from './pages/shop/shop.component';
import { BreadCrumbAreaComponent } from './components/bread-crumb-area/bread-crumb-area.component';
import { PageNotFoundComponent } from './pages/404/404.component';
import { UnauthorizedComponent } from './pages/403/403.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CheckoutAreaComponent } from './components/checkout-area/checkout-area.component';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileAreaComponent } from './components/profile-area/profile-area.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, CartMenuComponent, MobileMenuComponent, SliderAreaComponent, BannerAreaComponent, ProductTabComponent, FeatureAreaComponent, FooterAreaComponent, WishlistModalComponent, AddToCartModalComponent, QuickViewModalComponent, ProductCardComponent, ModalComponent, CheckoutComponent, ShopComponent, BreadCrumbAreaComponent, PageNotFoundComponent, UnauthorizedComponent, ProfileComponent, CheckoutAreaComponent, ProfileAreaComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule, AuthModule],
})
export class UserModule {}
