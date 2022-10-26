import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Category } from '../interfaces/category';
import { ProductsService } from './../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categories: Category[] = [];
  constructor(
    public fb: FormBuilder,
    private productsService: ProductsService,
    private route: Router
  ) {
    this.categoryForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    const observer = {
      next: () => {
        alert('added succesfully next!');
      },
      error: (err: Error) => alert(err.message),
    };
    if (this.categoryForm.valid) {
      this.productsService
        .addCategory(this.categoryForm.value)
        .subscribe(observer);
    }
    this.productsService.checkCategoryChange = true;
    this.route.navigateByUrl('/products/add');
  }
}
