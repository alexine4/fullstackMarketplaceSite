import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-product-form-page',
  templateUrl: './product-form-page.component.html',
  styleUrls: ['./product-form-page.component.scss']
})
export class ProductFormPageComponent implements OnInit {
  @ViewChild('input') inputRef?: ElementRef
  isNew = true
  form!: FormGroup
  image!: File
  imagePreview: string | any
  category: Category | any
  massage!: string

  constructor(private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })

    this.form.disable()
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            // redacted form
            this.isNew = false
            return this.categoriesService.getById(params['id'])
          }
          return of(null)
        }
        )
      ).subscribe(
        category => {
          if (category) {
            this.category = category
            this.form.patchValue({
              name: category.name,
              description: category.description
            })
            this.imagePreview = category.imageSrc
            MaterialService.updateTextInput()
          }

          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )


  }

  onSubmit() {
    let obs$

    if (this.isNew) {
      // create
      obs$ = this.categoriesService.create(this.form.value.name, this.form.value.description, this.image)
      this.massage = 'New category was added'

    } else {
      // update
      obs$ = this.categoriesService.update(this.category.id, this.form.value.name, this.form.value.description, this.image)
      this.massage = 'Category was updated'
    }
    obs$.subscribe(
      category => {

        MaterialService.toast(this.massage)
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      },
      () => this.router.navigate(['/categories'])
    )
  }

  triggerClick() {
    this.inputRef?.nativeElement.click()
  }
  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  deleteCategory() {
    const decision = window.confirm(`Are you sure you want to delete the record of category ?"${this.category.name}"`)
    if (decision) {
      this.categoriesService.delete(this.category.id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        )
    }
  }

}
