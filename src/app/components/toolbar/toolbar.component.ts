
import { IToolPanel, IToolPanelParams } from 'ag-grid-community';
import { Component, OnDestroy } from '@angular/core';

@Component({
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})

export class CustomToolBarComponent implements IToolPanel, OnDestroy {
    params: IToolPanelParams;
    totalRecord: number = 0;
    totalSelect: number = 0;
    selectedMode: boolean = false;
    selectedNodes = [];
    refresh(): void {}

    constructor() {}

    agInit(params: IToolPanelParams): void {
        this.params = params;
        this.params.api.addEventListener('modelUpdated', this.modelUpdated.bind(this));
        this.params.api.addEventListener('selectionChanged', this.selectionChanged.bind(this));
    }

    checkedMode(): void {
        this.selectedMode = !this.selectedMode;
        const visible = this._getCurrentVisibility();
        if (visible) {
          this.selectedNodes = this.params.api.getSelectedNodes();
          this.params.api.deselectAll();
        } else {
          this.selectedNodes.forEach(node => node.setSelected(true));
        }
        this._setColumnVisibility('selection', !visible);
    }

    modelUpdated(): void {
        this.totalRecord = this.params.api.getDisplayedRowCount();
    }

    selectionChanged(): void {
        this.totalSelect = this.params.api.getSelectedRows().length;
    }

    private _getCurrentVisibility(): boolean {
        return this.params.columnApi.getColumn('selection').isVisible();
    }
    private _setColumnVisibility(columnKey: string, visible: boolean): void {
        this.params.columnApi.setColumnVisible(columnKey, visible);
    }
    ngOnDestroy() {
        this.params.api.removeEventListener('modelUpdated', this.modelUpdated.bind(this));
        this.params.api.removeEventListener('selectionChanged', this.selectionChanged.bind(this));
    }
}
