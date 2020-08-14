import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-categories-listing-page',
  templateUrl: './categories-listing-page.component.html',
  styleUrls: ['./categories-listing-page.component.scss'],
})
export class CategoriesListingPageComponent implements OnInit {
  listingTopic = 'all';
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.categories = data.categories;
    });

    this.route.queryParams.subscribe(params => {
      console.log('queryParams', params);
      // tslint:disable-next-line:no-string-literal
      this.listingTopic = (params['topic'] && params['topic'] !== '') ? params['topic'] : this.listingTopic;
    });
  }

}
