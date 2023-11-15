import { Address } from "./userModel";

export interface Order {
    orderId?: String;
    userId: String;
    billingDetails: Billing;
    address: Address;
    paymentDetails: PaymentDetails;
    items: CheckoutItem[];
    pricing: CheckoutPrice;
}

export interface Billing{
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNo: string;
    companyName: string;
    companyAddress: string;
}

export interface PaymentDetails{
    paymentMethod: string;
    transactionId: string;
    success: boolean;
}

export interface CheckoutItem{
    productName: string;
    productImage: string;
    price: string;
    quantity: number;
}

export interface CheckoutPrice{
    orderTotal: number;
    discount: number;
    delivery: number;
    GST: number;
    grandTotal: number;
}