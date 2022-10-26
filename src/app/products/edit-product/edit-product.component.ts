import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../services/products.service';
import { Product } from './../interfaces/product';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  // product: Product = {} as Product;
  categories: Category[] = [];
  productID: any;
  productForm: FormGroup;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      price: ['', [Validators.required]],
      categoryTo: [null, [Validators.required]],
      img: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProduct();
  }
  getCategories() {
    const observer = {
      next: (data: any) => {
        this.categories = data;
      },
      error: (err: Error) => alert(err.message),
      complete: () => console.log(`completed! Done! ngOnInit`, this.categories),
    };
    this.productsService.getCategories().subscribe(observer);
  }
  getProduct() {
    this.productID = this.route.snapshot.paramMap.get('id');
    this.productsService.getProductDetails(this.productID).subscribe((data) => {
      this.productForm.patchValue(data);
    });
  }
  onSubmit(): void {
    const observer = {
      next: () => {
        alert('updated succesfully next!');
      },
      error: (err: Error) => alert(err.message),
      complete: () => {
        this.router.navigateByUrl('/products');
      },
    };
    if (this.productForm.valid) {
      let test = this.productsService
        .updateProduct(this.productID, this.productForm.value)
        .subscribe(observer);
      console.log(test);
    }
  }
  resetForm() {
    this.productForm.reset();

    // this.productForm.setValue({
    //   name: '',
    //   price: '',
    // });
  }
}
