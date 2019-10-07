import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNew'
})
export class FilterNewPipe implements PipeTransform {

  transform(items: any[], filter: any,arg:any): any {
          if (!items || !filter) {
              return items;
          }
          // filter items array, items which match and return true will be
          // kept, false will be filtered out

              return items.filter(item => {
                console.log(JSON.stringify(item))
                console.log(filter)
                return item[arg].indexOf(filter) !== -1;
              });
            }
            

           
      }
 

// export class MyFilterPipe implements PipeTransform {
//   transform(items: any[], filter: Object): any {
//       if (!items || !filter) {
//           return items;
//       }
//       // filter items array, items which match and return true will be
//       // kept, false will be filtered out
//       return items.filter(item => item.title.indexOf(filter.title) !== -1);
//   }

