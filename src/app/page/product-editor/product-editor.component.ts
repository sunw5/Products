import { ProductService } from 'src/app/service/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss'],
})
export class ProductEditorComponent implements OnInit {
  /* product$: Observable<Product> = this.ar.params.pipe(
    switchMap((params) => {
      return this.productService.get(params['id']);
    })
  ); */
  productDefault$ = of(new Product());
  product$: Observable<Product> = this.ar.params.pipe(
    switchMap((params) => {
      return params['id'] === '0'
        ? this.productDefault$
        : this.productService.get(params['id']);
    })
  );

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  onSubmit(product: Product): void {
    if (product.id !== 0) {
      this.productService.update(product).subscribe((data) => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.create(product).subscribe((data) => {
        this.router.navigate(['/products']);
      });
    }
  }
}
