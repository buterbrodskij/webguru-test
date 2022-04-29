export interface IProduct {
   id: string;
   wbRating: number;
   reviewsCount : number;
   nomenclature : number
   sku :  string;
   name :  string;
   brandName :  string;
   brandId :  string;
   image :  string;
   preview :  string;
   ordered : number;
   soldQuantity : number;
   soldAmount : number;
   orderedAmount : number;
   availability : number;
}


export enum SortValues {
  TITLE = 'title',
  RATING = 'rating',
  BRAND_NAME = 'brandName',
}
