import { TestBed } from '@angular/core/testing';
import { ApiService } from '../service/api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { url } from '../config/config';
import { SearchListResponse } from '../models/models';

describe('Test Service', () => {

    let httpMock: HttpTestingController;
    let testService: ApiService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ ApiService ]
        });

        testService = TestBed.get(ApiService);
        httpMock = TestBed.get(HttpTestingController);

    });

    it('should be created', () => {
        expect(testService).toBeTruthy();
    });

    it('test service method', () => {
        const mockResponse = [
            {
                id: {
                    videoId: '3fumBcKC6RE'
                },
                snippet: {
                    description: 'Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.'
                }
            }
        ];
        testService.getData().subscribe((res: SearchListResponse) => {
            expect(res[0].id.videoId).toEqual('3fumBcKC6RE');
            expect(res[0].snippet.description).toEqual(
                'Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.'
            );
        });

        const req = httpMock.expectOne(url);

        expect(req.request.method).toEqual('GET');

        req.flush(mockResponse);

        httpMock.verify();
    });

});
