import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SortmoviePipe implements PipeTransform {

  transform(items: any, searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((item: { movieTitle: string }) => {
      const itemTitle = item.movieTitle.toLowerCase();
      return itemTitle.includes(searchText);
    });
  }


}
