import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productList$: Observable<Product[]> = this.productService.getAll();

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  onDelete(product: Product) {
    this.productService.delete(product).subscribe(() => {
      // this.productList$ = this.productService.getAll();
      this.productList$ = this.productList$.pipe(
        filter((prl, i) => prl[i].id !== product.id)
      );

      /* this.productList$ = this.productList$.pipe(
        map((pl) => pl.filter((p) => p.id !== product.id))
      ); */
    });
  }
}
