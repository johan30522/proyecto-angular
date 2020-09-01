import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from '../utils/utils.service';


@Injectable({
  providedIn: 'root'
})
export class DateAdapterService extends NgbDateAdapter<string> {
  constructor(private readonly utilsService: UtilsService) {
    super();
  }

  private readonly DELIMITER = '-';

  public fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        year: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        day: parseInt(date[2], 10)
      };
    }
    return null;
  }

  public toModel(date: NgbDateStruct | null): string | null {
    return date
      ? this.utilsService.padNumber(date.year) +
          this.DELIMITER +
          this.utilsService.padNumber(date.month) +
          this.DELIMITER +
          this.utilsService.padNumber(date.day)
      : null;
  }
}
