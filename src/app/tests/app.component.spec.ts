import { AppComponent } from '../app.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SearchListResponse } from '../models/models';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { CustomToolBarComponent } from '../components/toolbar/toolbar.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ApiService } from '../service/api.service';
import {BrowserTestingModule} from '@angular/platform-browser/testing';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    const mockResponse: SearchListResponse = {
        kind: 'youtube#searchListResponse',
        etag: '"p4VTdlkQv3HQeTEaXgvLePAydmU/Xgm2GzBIA-b5d1V1nnS6C70JnHA"',
        nextPageToken: 'CDIQAA',
        regionCode: 'BY',
        pageInfo: {
            totalResults: 1000000,
            resultsPerPage: 50
        },
        items: [{
            kind: 'youtube#searchResult',
            etag: '"p4VTdlkQv3HQeTEaXgvLePAydmU/QtJ4MlYKdN_zTBjfY3xY6mn7ZRg"',
            id: {
                kind: 'youtube#video',
                videoId: '3fumBcKC6RE'
            },
            snippet: {
                publishedAt: '2011-05-12T20:01:31.000Z',
                channelId: 'UCEOhcOACopL42xyOBIv1ekg',
                title: 'Lil Wayne - John (Explicit) ft. Rick Ross',
                description: 'Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.',
                thumbnails: {
                default: {
                    url: 'https://i.ytimg.com/vi/3fumBcKC6RE/default.jpg',
                    width: 120,
                    height: 90
                },
                medium: {
                    url: 'https://i.ytimg.com/vi/3fumBcKC6RE/mqdefault.jpg',
                    width: 320,
                    height: 180
                },
                high: {
                    url: 'https://i.ytimg.com/vi/3fumBcKC6RE/hqdefault.jpg',
                    width: 480,
                    height: 360
                }
                },
                channelTitle: 'LilWayneVEVO',
                liveBroadcastContent: 'none'
            }
            },
            {
            kind: 'youtube#searchResult',
            etag: '"p4VTdlkQv3HQeTEaXgvLePAydmU/HY_Q6YVFuxTsJwCLCFq1tibsK7w"',
            id: {
                kind: 'youtube#video',
                videoId: '450p7goxZqg'
            },
            snippet: {
                publishedAt: '2013-10-02T14:00:06.000Z',
                channelId: 'UCNnnwVSI5Ndo2I4Y-LPuuew',
                title: 'John Legend - All of Me (Edited Video)',
                description: 'John Legend\'s official music video for \'All Of Me\'.' +
                'Click to listen to John Legend on Spotify: http://smarturl.it/JohnLSpotify?IQid=... As featured on Love In The ...',
                thumbnails: {
                default: {
                    url: 'https://i.ytimg.com/vi/450p7goxZqg/default.jpg',
                    width: 120,
                    height: 90
                },
                medium: {
                    url: 'https://i.ytimg.com/vi/450p7goxZqg/mqdefault.jpg',
                    width: 320,
                    height: 180
                },
                high: {
                    url: 'https://i.ytimg.com/vi/450p7goxZqg/hqdefault.jpg',
                    width: 480,
                    height: 360
                }
                },
                channelTitle: 'johnlegendVEVO',
                liveBroadcastContent: 'none'
            }
        }
      ]
    };

    const mockApiService = jasmine.createSpyObj<ApiService>('ApiService', {
        getData: of(mockResponse)
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [
            AppComponent,
            CustomToolBarComponent,
            CheckboxComponent,
        ],
        providers: [{
            provide: ApiService,
            useValue: mockApiService
        },
        ],
        imports: [
            BrowserTestingModule,
            FormsModule,
            AgGridModule.withComponents([
                CheckboxComponent,
                CustomToolBarComponent
            ])
        ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be create', () => {
        expect(component).toBeTruthy();
    });

    it('grid API is available', () => {
        expect(component.gridOptions.api).toBeTruthy();
    });

    it('the grid cells should be displayed', () => {
        const appElement = fixture.nativeElement;
        const cellElements = appElement.querySelectorAll('.ag-cell-value');
        expect(cellElements.length).toEqual(8);
        expect(cellElements[3].textContent).toEqual('Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.');
    });
});
