import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
@Component({
  selector: 'app-product-edit',
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField
  ],
  standalone: true,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getById(id).subscribe(p => this.product = p);
  }

  update(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.update(id, this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
