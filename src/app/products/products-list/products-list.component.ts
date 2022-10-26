import { ProductsService } from './../services/products.service';
import { Product } from './../interfaces/product';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCatgeory: string = '';
  searchQuery: string = '';
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
    this.productsService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }
  onDelete(id: number, product: any) {
    const observer = {
      next: () => {
        console.log('removed succesfully');
        this.productsService.getProducts().subscribe((data: any) => {
          this.products = data;
        });
      },
      error: (err: Error) => alert(err.message),
    };
    this.productsService.removeProduct(id).subscribe(observer);
  }
  onEdit(id: number) {
    this.router.navigate(['products/edit', id]);
  }
  onChangeSelect() {
    let selectedCatgeory = this.selectedCatgeory;

    this.productsService
      .getProductsOfCategory(selectedCatgeory)
      .subscribe((data) => {
        this.products = data;
      });
    if (selectedCatgeory == '') {
      this.productsService.getProducts().subscribe((data) => {
        this.products = data;
      });
    }
  }
  onSearch() {
    let query = this.searchQuery;
    if (query.length > 2) {
      this.productsService.searchProducts(query).subscribe((data) => {
        this.products = data;
      });
    }
    if (query.length == 0) {
      this.productsService.getProducts().subscribe((data) => {
        this.products = data;
      });
    }
  }
}
