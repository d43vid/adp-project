import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeNav',
  standalone: true
})
export class ActiveNavPipe implements PipeTransform {

  transform(pathSegment: string, activePath: Array<string>): boolean {
    return activePath.some((path) => path.includes(pathSegment));
  }
}
