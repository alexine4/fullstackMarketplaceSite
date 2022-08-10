import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../shared/interfaces';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  categories$: Observable<Category[]> | undefined

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch()
  }

}
