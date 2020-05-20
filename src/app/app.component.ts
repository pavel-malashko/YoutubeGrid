import { Component, OnInit } from '@angular/core';
import { RowData, SearchListResponse, Item } from './models/models';
import { ApiService } from './service/api.service';
import { map, catchError } from 'rxjs/operators';
import { CustomToolBarComponent } from './components/toolbar/toolbar.component';
import { GridOptions } from 'ag-grid-community';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { Observable, throwError } from 'rxjs';
import { dataColumns } from './constants/column.const';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    rowData: Observable<RowData[]>;
    error: any;
    gridOptions: GridOptions = {
        columnDefs: dataColumns,
        suppressRowClickSelection: true,
        paginationAutoPageSize: true,
        sideBar: {
        toolPanels: [
            {
            id: 'ToolBar',
            labelDefault: 'ToolBar',
            labelKey: 'ToolBar',
            iconKey: 'app-custom-toolbar',
            toolPanel: 'toolbar',
            }
        ],
        defaultToolPanel: 'customToolBar'
        },
        icons: { 'app-custom-toolbar': '<span class="ag-icon ag-icon-custom-toolbar"></span>' },
        frameworkComponents: { toolbar: CustomToolBarComponent, agColumnHeader: CheckboxComponent },
        rowSelection: 'multiple',
        popupParent: document.querySelector('body'),
        getContextMenuItems: (params) => this.getContextMenuItems(params),
        context: this
    };

    constructor(private _apiSrv: ApiService) {}

    static mapVideoToView(list: SearchListResponse): RowData[] {
        return list.items.map((item: Item) => {
        return new RowData(
            {
                image: `<img src="${item.snippet.thumbnails.default.url}"/>`,
                publishedAt:  item.snippet.publishedAt,
                title:  `https://www.youtube.com/watch?v=${item.id.videoId}`,
                description:  item.snippet.description,
            }
        );
        });
    }

    ngOnInit() {
        this.rowData = this._apiSrv.getData().pipe(
            map(AppComponent.mapVideoToView),
            catchError(err => {
                this.error = err;
                return throwError(err);
            })
        );
    }

    getContextMenuItems(params): Array<any> {
        const contextItems =  params.defaultItems;
        if (params.column.colId === 'title') {
            contextItems.push({
                name: 'Open in new tab',
                action: () => {
                window.open(params.node.data.title);
                },
            });
        }
        return contextItems;
    }
}
