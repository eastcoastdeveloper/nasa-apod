import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GlobalFeaturesService } from 'src/app/services/global-features.service';
import { NasaSearchService } from '../../services/nasa.service';

@Component({
  selector: '[nasa-photo-body]',
  templateUrl: 'photo-body.component.html',
  styleUrls: ['photo-body.component.scss'],
})
export class NasaPhotoBodyComponent implements AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @Output() outputData = new EventEmitter();
  categoryMenuStatus: boolean | undefined;
  fullExplanation: boolean = false;
  datePickerStatus: boolean | undefined;
  explanation: string = '';
  searchQuery: any[] = [];
  backgroundImage: string | undefined;
  result: any[] = [];
  videoURL: string | undefined;
  mediaType?: null;

  constructor(
    private _nasa: NasaSearchService,
    private _cd: ChangeDetectorRef,
    private _globalFeatures: GlobalFeaturesService
  ) {}

  ngAfterViewInit() {
    this._nasa.chosenMedia$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentVal) => {
        this.explanation = currentVal.explanation;
        this.backgroundImage = currentVal.url;
        this.mediaType = currentVal.media_type;
        this.videoURL != null ? this.createURL(currentVal.url) : '';
        Object.keys(currentVal).length > 0 ? this.result.push(currentVal) : '';
      });

    this._nasa.dataPickerCurrentVal
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentVal) => {
        this.datePickerStatus = currentVal;
        this.shareData();
      });

    this._globalFeatures.categoryNavigationMenu$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        val ? (this.fullExplanation = false) : '';
      });

    this._cd.detectChanges();
  }

  createURL(val: any) {
    this.videoURL = val;
    return this.videoURL;
  }

  loadHistoryItem(dataSet: any) {
    this.explanation = dataSet.explanation;
    this.backgroundImage = dataSet.url;
    // this.getUrl();
    this.mediaType = dataSet.media_type;
    // this.videoURL != null ? this.createURL(dataSet.url) : '';
  }

  getUrl() {
    return "url('" + this.backgroundImage + "')";
  }

  shareData() {
    this.outputData.emit(this.result);
  }

  closeCalendar() {
    this._nasa.changeDatePickerVal(false);
  }

  showText() {
    this.fullExplanation = !this.fullExplanation;
    this._nasa.changeDatePickerVal(false);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
