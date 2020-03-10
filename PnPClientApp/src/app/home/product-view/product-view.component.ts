import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_interfaces/product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  products$: Observable<Product[]>;
  products: Product[] = [];
  product: Product;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    const id = + this.route.snapshot.params.id;

    this.productService.getProductById(id).subscribe(
      res => {
          this.product = res;
      },
      error => {
          console.log(error);
      }
    );
  }

}
