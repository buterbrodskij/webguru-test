import {Component, Input} from "@angular/core";
import {IProduct, SortValues} from "../../types/products";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const sortFns: Record<string, Function> = {
  [SortValues.TITLE]: (a: IProduct, b: IProduct) => {
    return a.name.localeCompare(b.name)
  },
  [SortValues.BRAND_NAME]: (a: IProduct, b: IProduct) => {
    return a.brandName.localeCompare(b.brandName)
  },
  [SortValues.RATING]: (a: IProduct, b: IProduct) => {
    return b.wbRating - a.wbRating
  }
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent {
  constructor(private http: HttpClient) {
  }


  page = 0;
  products: IProduct[][] = [];
  sortedInfo: Record<number, SortValues | null> = {}
  currentSort: SortValues | null = null;


  ngOnInit() {
    this.getProducts().subscribe(products => {
      this.products = this.chunkArray(products, 5);
      this.setupSortedInfo();
    })
  }

  getProducts(): Observable<any> {
    return this.http.get('/assets/products.json')
  }

  chunkArray(array: [], chunkSize: number = 1): any[] {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }

    return result;
  }


  changePage(page: number) {
    this.page = page;
    this.currentSort && this.doSort(this.currentSort);
  }

  setupSortedInfo() {
    for (let i = 0; i < this.products.length; i++) {
      this.sortedInfo[i] = null
    }
  }

  doSort(sort: SortValues) {
    if (this.sortedInfo[this.page] === sort) return;

    this.products[this.page].sort((a, b) => sortFns[sort](a, b))
    this.sortedInfo[this.page] = sort;
    this.currentSort = sort;
  }
}
