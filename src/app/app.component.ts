import { Component, ViewChild } from '@angular/core';
import { NasaSearchService } from './services/nasa.service';
import { NasaHeaderComponent } from './components/header/header.component';
import { NasaPhotoBodyComponent } from './components/photo-body/photo-body.component';
import { NasaSearchComponent } from './components/seachbar/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  history!: any[];
  // pageDataObject: PageDataObject = {
  //   title: 'APOD NASA Gov',
  //   publishedOn: 'Oct 1, 2022',
  //   updatedOn: 'Jan 10, 2023',
  //   repoTitle: '',
  //   repoLink: '',
  //   category: '',
  //   views: 0,
  //   forks: 0,
  //   cornerStone: false,
  //   threeColumnLayout: true,
  //   meta: {
  //     description:
  //       "APOD Nasa Gov; Nasa's Photo of the Day API. Select a date from now til 1995. Access photos/ video dating back to 1995.",
  //     keywords: 'web development project, apod nasa, nasa api',
  //     title: 'APOD Nasa Gov',
  //     dateCreated: '2022-10-15',
  //     dateModified: '2023-04-05'
  //   }
  // };

  @ViewChild(NasaPhotoBodyComponent) photoBodyReference:
    | NasaPhotoBodyComponent
    | undefined;
  @ViewChild(NasaHeaderComponent) headerReference:
    | NasaHeaderComponent
    | undefined;
  @ViewChild(NasaSearchComponent) searchReference:
    | NasaSearchComponent
    | undefined;

  constructor(private _nasaSearchService: NasaSearchService) {}

  externalClick() {
    this._nasaSearchService.changeDatePickerVal(false);
  }

  searchResults(e: any) {
    this.history = e;
  }

  loadDataSet(value: any) {
    // this.photoBodyReference.loadHistoryItem(value);
    // this.headerReference.loadHistoryItem(value);
    // this.searchReference.calendarReference.currentDate = '';
    // this.searchReference.calendarReference.getValue();
  }
}
