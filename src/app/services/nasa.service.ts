import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DataModel } from '../interfaces/nasa.model';

@Injectable({
  providedIn: 'root',
})
export class NasaSearchService implements OnDestroy {
  chosenDate: any = '';
  result: any = {};
  history: {}[] = [];
  datePickerStatus: boolean = false;

  public model: DataModel;
  private unsubscribe$ = new Subject<void>();

  private searchSubject = new Subject<any>();
  private dateSource = new BehaviorSubject(this.chosenDate);
  private mediaSource = new BehaviorSubject(this.result);
  private historySource = new BehaviorSubject(this.history);
  private datePickerSource = new BehaviorSubject(this.datePickerStatus);

  chosenDateValue$ = this.dateSource.asObservable();
  chosenMedia$ = this.mediaSource.asObservable();
  history$ = this.historySource.asObservable();
  dataPickerCurrentVal = this.datePickerSource.asObservable();

  url: string = 'https://api.nasa.gov/planetary/apod';
  key: string = '';
  count: string = '15';
  explanation: string = '';
  title: string = '';

  constructor(private _http: HttpClient) {
    this.model = {
      explanation: this.explanation,
      hdurl: this.url,
      title: this.title,
    };
  }

  changeDatePickerVal(newVal: boolean) {
    this.datePickerSource.next(newVal);
    return newVal;
  }

  sendSearchQuery(searchQuery: string) {
    this.searchSubject.next({ text: searchQuery });
  }

  currentDate(year: number, month: number, day: number) {
    this.fetchData(`${year}-${month + 1}-${day}`);
    this.dateSource.next({ year: year, month: month, day: day });
    return { year: year, month: month, day: day };
  }

  getSearchQuery(): Observable<any> {
    return this.searchSubject.asObservable();
  }

  // Only Call if Not Cached
  fetchData(date: string) {
    this._http
      .get<DataModel[]>(
        'https://api.nasa.gov/planetary/apod?api_key=' +
          this.key +
          '&date=' +
          date
      )
      .pipe(
        takeUntil(this.unsubscribe$),
        map((data) => {
          this.result = data;
        })
      )
      .subscribe((data) => {
        this.mediaSource.next(this.result);
        if (Object.keys(this.result).length != 0) {
          this.history.push(this.result);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
