import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_interfaces/product';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;
  products: Product[] = [];
  globalResponse: any;

  constructor(private pservice: ProductService,
              private router: Router) { }

  ngOnInit() {
            // load all products from database
            this.products$ = this.pservice.getProducts();
            this.products$.subscribe(
            res => {
              this.products = res;
              console.log(this.products);
              this.globalResponse = res;
              });

  }

  onSelect(product: Product) {
    this.router.navigateByUrl('/productview/' + product.id);
  }

}
