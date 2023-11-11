export const SERVER_API_BASE_URL = 'http://localhost:9090';

export interface CommonReponse {
  statusCode: number;
  success: boolean;
  message: String;
  pagination: Pagination;
  data: any;
}

export interface Pagination {
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  total: number;
}

export interface User {
  userId: string;
  userFirstName: string;
  userLastName: string;
  userPhone: string;
  userEmail: string;
  userEncryptedPassword: string;
  userSavedAddresses: Address[];
  userRole: UserRole;
  cart: Cart;
}

export interface Address {
  addressId: string;
  addressLineOne: string;
  addressLineTwo: string;
  addressState: string;
  addressCity: string;
  addressPincode: string;
  addressLandmark: string;
  addressGeoHash: string;
}

export interface Cart {
  cartItems: CartItem[];
  cartTotal: number;
}

export interface CartItem {
  cartItemProduct: Product;
  cartItemQuantity: number;
}

export interface Product {
  id: String;
  desc: String;
  sku_max_quantity: String;
  pack_desc: String;
  sort_index_pos: number;
  cart_count: number;
  is_best_value: boolean;
  weight: String;
  absolute_url: String;
  usp: String;
  availability: Availability;
  pricing: Pricing;
  images: Image[];
  variableWeight: String;
  brand: Brand;
  category: Category;
  children: Product[];
  rating_info: RatingInfo;
  additional_info: AdditionalInfo;
  parent_info: ParentInfo;
}

export interface Availability {
  avail_status: String;
  display_mrp: boolean;
  display_sp: boolean;
  not_for_sale: boolean;
  button: String;
  show_express: boolean;
}

export interface Pricing {
  discount: Discount;
  offer: Offer;
}

export interface Discount {
  mrp: String;
  d_text: String;
  d_avail: String;
  offer_entry_text: String;
  subscription_price: String;
  offer_available: String;
}

export interface Offer {
  campaign_type_slug: String;
  offer_logo_web: boolean;
  arrow_image: String;
  offer_available: String;
  campaign_type: String;
  offer_logo: String;
  offer_logo_big: String;
  text_color: String;
  offer_logo_small: String;
  offer_ent_txt: String;
  offer_entry_text: String;
}

export interface Image {
  s: String;
  m: String;
}
export interface Brand {
  name: String;
  slug: String;
  url: String;
}
export interface Category {
  tlc_name: String;
  tlc_slug: String;
  mlc_name: String;
  mlc_slug: String;
  mlc_id: number;
  llc_name: String;
  llc_slug: String;
  llc_id: number;
}
export interface RatingInfo {
  avg_rating: String;
  rating_count: number;
  review_count: number;
  sku_id: number;
  order_count: number;
  member_count: number;
}
export interface AdditionalInfo {
  other_app_pd: boolean;
  per_unit_pd_page: boolean;
  other_app_listing: boolean;
  per_unit_listing_page: boolean;
  per_unit_pack_selector: boolean;
}
export interface ParentInfo {
  id: number;
  parent_product_id: number;
  child_product_id: number;
  order: number;
  parent_id: number;
  child_id: number;
  is_default: number;
  type: number;
  created_by_id: number;
  updated_by_id: number;
  created_on: String;
  updated_on: String;
}

export type UserRole = 'ADMIN' | 'USER' | 'DELIVERY_PARTNER' | 'STORE_MANAGER';
