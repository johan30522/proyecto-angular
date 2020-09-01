import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from '../utils/utils.service';


@Injectable({
  providedIn: 'root'
})
export class DateFormatterService extends NgbDateParserFormatter {
  constructor(private readonly utilsService: UtilsService) {
    super();
  }

  private readonly DELIMITER = '/';

  public parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month: parseInt(date[0], 10),
        day: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  public format(date: NgbDateStruct | null): string {
    return date
      ? this.utilsService.padNumber(date.month) +
          this.DELIMITER +
          this.utilsService.padNumber(date.day) +
          this.DELIMITER +
          this.utilsService.padNumber(date.year)
      : '';
  }
}
