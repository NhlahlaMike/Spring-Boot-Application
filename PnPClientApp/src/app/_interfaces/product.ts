export interface Product {
  id: number;
  barcode: string;
  productName: string;
  productDescription: string;
  imageUrl: string;
  productType: string;
  price: number;
  quantity: number;
  features: string;
  outOfStock: boolean;
  billingAddress: string;
  tc: string;
  sellerId: number;
  sellerName: string;
}
