import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  public products: {
    id: string,
    productName: string,
    description: string,
    price: number,
  }[] = [];

  constructor(
    private _productsService: ProductsService
  ) {}

  ngOnInit() {

    this.products = this._productsService.getProducts();
  }

  getProducts() {
    return [
      {
        id: 'P-101',
        productName: 'Logitech Mouse',
        description: '6 Button Mechanical Mouse',
        price: 899.00,
      },
      {
        id: 'P-102',
        productName: 'JBL BT Speaker',
        description: 'Waterproof Radio 360 Surround',
        price: 1099.00,
      },
      {
        id: 'P-103',
        productName: 'Mechanical KeyBoard',
        description: 'Hot-swappable RGB Backlit',
        price: 2395.00,
      },
      {
        id: 'P-104',
        productName: 'Oculus Meta',
        description: 'All-in-one Gaming Headset',
        price: 22450.00,
      },
    ];
  }
}


