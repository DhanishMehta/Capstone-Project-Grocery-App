import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { CheckoutItem, Order } from 'src/shared/model/orderModel';
import { User } from 'src/shared/model/userModel';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { UserService } from 'src/shared/services/user/user.service';

@Component({
  selector: 'user-checkout-area',
  templateUrl: './checkout-area.component.html',
  styleUrls: ['./checkout-area.component.scss'],
})
export class CheckoutAreaComponent implements OnInit {
  isLoading = true;

  couponCode!: FormControl;
  orderDetails!: FormArray;
  billingDetails!: FormGroup;
  addressDetails!: FormGroup;
  payemntDetails!: FormGroup;

  newOrder!: Order;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userId = this.authService.getUserId();
    this.userService.getUserById(userId!).subscribe({
      next: (res) => {
        this.user = res.data;
        console.warn("From checkout area ts");
        console.log(this.user);
        this.initForms();
      }, error : (er) => {
        console.warn("error incoming from checkout area");
        console.error(er);
      }
    });
  }

  initForms() {
    console.warn("inside init forms");
    this.couponCode = this.fb.control('');
    this.orderDetails = this.fb.array([
      (this.billingDetails = this.fb.group({
        firstName: this.fb.control(this.user.userFirstName, Validators.required),
        lastName: this.fb.control(this.user.userLastName, Validators.required),
        emailAddress: this.fb.control(this.user.userEmail, Validators.required),
        phoneNo: this.fb.control(this.user.userPhone, Validators.required),
        companyName: this.fb.control(''),
        companyAddress: this.fb.control(''),
      })),
      (this.addressDetails = this.fb.group({
        country: this.fb.control('India'),
        addressLine1: this.fb.control(
          this.user.userSavedAddresses[0] ? this.user.userSavedAddresses[0].addressLineOne : '', Validators.required
        ),
        addressLine2: this.fb.control(
          this.user.userSavedAddresses[0] ? this.user.userSavedAddresses[0].addressLineTwo : '', Validators.required
          ),
          city: this.fb.control(
            this.user.userSavedAddresses[0] ? this.user.userSavedAddresses[0].addressCity : '', Validators.required
        ),
        state: this.fb.control(
          this.user.userSavedAddresses[0] ? this.user.userSavedAddresses[0].addressState : '', Validators.required
        ),
        zipcode: this.fb.control(
          this.user.userSavedAddresses[0] ? this.user.userSavedAddresses[0].addressPincode : '', Validators.required
        ),
        deliveryInstructions: this.fb.control(''),
      })),
      (this.payemntDetails = this.fb.group({
        paymentMethod: this.fb.control(''),
      })),
    ]);
    console.warn("inside init forms before end");
    this.isLoading = false;
  }
  
  handleAddCouponCode() {}

  handlePlaceOrder() {
    if (this.orderDetails.valid) {
      const formValue = this.orderDetails.value;
      const userId = this.authService.getUserId();
      this.newOrder = {
        userId: userId!,
        billingDetails: {
          firstName: formValue.billingDetails.firstName,
          lastName: formValue.billingDetails.lastName,
          emailAddress: formValue.billingDetails.emailAddress,
          phoneNo: formValue.billingDetails.phoneNo,
          companyName: formValue.billingDetails.companyName,
          companyAddress: formValue.billingDetails.companyAddress,
        },
        address: {
          addressLineOne: formValue.addressDetails.addressLine1,
          addressLineTwo: formValue.addressDetails.addressLine2,
          addressState: formValue.addressDetails.state,
          addressCity: formValue.addressDetails.city,
          addressPincode: formValue.addressDetails.zipcode,
          addressLandmark: formValue.addressDetails.deliveryInstructions,
        },
        paymentDetails: {
          paymentMethod: '',
          transactionId: '',
          success: false,
        },
        items: [],
        pricing: {
          orderTotal: 0,
          discount: 0,
          delivery: 0,
          GST: 0,
          grandTotal: 0,
        },
      };
      this.setItemsInOrder();
      this.setPriceInOrder();
    }
  }

  setItemsInOrder(){
    this.newOrder.items = [];
    this.user.cart?.cartItems.forEach(item => {
      const newCheckoutItem: CheckoutItem = {
        productName: item.cartItemProduct.desc,
        productImage: item.cartItemProduct.images![0].m,
        price: item.cartItemProduct.pricing.discount.mrp,
        quantity: item.cartItemQuantity,
      }
      this.newOrder.items.push(newCheckoutItem);
    })
  }

  setPriceInOrder(){
    this.newOrder.pricing.orderTotal = this.user.cart?.cartTotal!;
    let discount = 0;
    this.user.cart?.cartItems.forEach(item => {
      discount += Number(item.cartItemProduct.pricing.discount.mrp) - Number(item.cartItemProduct.pricing.discount.subscription_price);
    })
    this.newOrder.pricing.discount = discount;
    this.newOrder.pricing.delivery = 0.1 * this.newOrder.pricing.orderTotal;
    this.newOrder.pricing.GST = 0.1 * this.newOrder.pricing.orderTotal;
    this.newOrder.pricing.grandTotal = this.newOrder.pricing.orderTotal + this.newOrder.pricing.GST + this.newOrder.pricing.delivery - this.newOrder.pricing.discount;
  }
}
