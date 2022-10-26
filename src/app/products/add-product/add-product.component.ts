import { ProductsService } from './../services/products.service';
import { Component, OnInit, SimpleChanges, DoCheck } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Category } from '../interfaces/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  constructor(
    public fb: FormBuilder,
    private productsService: ProductsService,
    private route: Router
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
    const observer = {
      next: (data: any) => {
        this.categories = data;
      },
      error: (err: Error) => alert(err.message),
      complete: () => console.log(`completed! Done! ngOnInit`, this.categories),
    };
    this.productsService.getCategories().subscribe(observer);
  }

  get newCategory() {
    return this.productForm.get('category');
  }
  ngDoCheck() {
    const observer = {
      next: (data: any) => {
        this.categories = data;
      },
      error: (err: Error) => alert(err.message),
      complete: () => console.log(`completed! Done!`, this.categories),
    };
    // check for object mutation
    if (this.productsService.checkCategoryChange === true) {
      this.productsService.getCategories().subscribe(observer);
      this.productsService.checkCategoryChange = false;
      console.log(this.productsService.checkCategoryChange);
      console.log('NG ON CHANGES');
    }
  }
  onSubmit(): void {
    const observer = {
      next: () => {
        alert('added succesfully next!');
      },
      error: (err: Error) => alert(err.message),
      complete: () => {
        console.log(this.productForm.value);
        this.route.navigateByUrl('/home');
      },
    };
    if (this.productForm.valid) {
      this.productsService
        .addProduct(this.productForm.value)
        .subscribe(observer);
    }
  }
  // onImagePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files;

  //   if (file) {
  //     const parsedFile = file[0];
  //     // this.productForm.patchValue({ img: parsedFile });
  //     let img = this.productForm.get('img');
  //     if (img) {
  //       img.updateValueAndValidity();
  //       console.log(img);
  //     }
  //   }
  // }
  // onChangeCategory(e: any) {
  // let cat = this.productForm.get('category');
  // if (cat) {
  //   this.productForm?.setValue(cat, {
  //      img: true,
  //   });
  // }}
  resetForm() {
    this.productForm.reset();
  }
}
