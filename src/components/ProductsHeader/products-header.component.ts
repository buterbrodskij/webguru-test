import {Component, EventEmitter, Output} from "@angular/core";
import {SortValues} from "../../types/products";

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.scss']
})


export class ProductsHeaderComponent {
  @Output() onSort = new EventEmitter<SortValues>();

  header: {name: string;sort: SortValues | null}[] = [
    {
      name: 'Название',
      sort: SortValues.TITLE
    }, {
      name: 'Рейтинг',
      sort: SortValues.RATING
    }, {
      name: 'Название брэнда',
      sort: SortValues.BRAND_NAME
    }, {
      name: 'sku',
      sort: null
    }
  ]

  activeSort = '';


  sort(value: SortValues) {
    if (this.activeSort === value) return;
    this.activeSort = value;
    this.onSort.emit(value)
  }
}
