import { Component, OnInit } from '@angular/core';
import { RowData, ContextItem, Params } from './models/models';
import { ApiService } from './service/api.service';
import { catchError, map } from 'rxjs/operators';
import { CustomToolBarComponent } from './components/toolbar/toolbar.component';
import { GridOptions } from 'ag-grid-community';
import { Observable, throwError } from 'rxjs';
import { dataColumns } from './constants/column.const';
import { WindowRef } from './windowRef';
import { HeaderCheckboxComponent } from './components/header-checkbox/header-checkbox.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    rowData: Observable<RowData[]>;
    error: HttpErrorResponse = null;
    gridOptions: GridOptions = {
        columnDefs: dataColumns,
        suppressRowClickSelection: true,
        paginationAutoPageSize: true,
        sideBar: {
            toolPanels: [{
                id: 'ToolBar',
                labelDefault: 'ToolBar',
                labelKey: 'ToolBar',
                iconKey: 'app-custom-toolbar',
                toolPanel: 'toolbar',
            }],
            defaultToolPanel: 'customToolBar'
        },
        icons: { 'app-custom-toolbar': '<span class="ag-icon ag-icon-custom-toolbar"></span>' },
        frameworkComponents: { toolbar: CustomToolBarComponent, agColumnHeader: HeaderCheckboxComponent},
        rowSelection: 'multiple',
        getContextMenuItems: (params) => this.getContextMenuItems(params),
        context: this
    };

    constructor(private _apiSrv: ApiService, private _window: WindowRef) {}


    ngOnInit() {
        this.rowData = this._apiSrv.getData().pipe(
            map(ApiService.mapVideoToView),
            catchError((err: HttpErrorResponse) => {
                this.error = err;
                return throwError(err);
            })
        );
    }

    getContextMenuItems(params: Params): Array<ContextItem> {
        const contextItems =  params.defaultItems;
        if (params.column.colId === 'title') {
            contextItems.push({
                name: 'Open in new tab',
                action: () => {
                    this._window.nativeWindow.open(params.node.data.title);
                },
            });
        }
        return contextItems;
    }
}
