
import { IToolPanel, IToolPanelParams } from 'ag-grid-community';
import { Component } from '@angular/core';

@Component({
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})

export class CustomToolBarComponent implements IToolPanel {
    params: IToolPanelParams;
    totalRecord: number = 0;
    totalSelect: number = 0;
    selectedMode: boolean = false;
    selectedNodes = [];
    refresh(): void {}

    constructor() {}

    agInit(params: IToolPanelParams): void {
        this.params = params;
        this.params.api.addEventListener('modelUpdated', () => {
            this.totalRecord = this.params.api.getDisplayedRowCount();
        });
        this.params.api.addEventListener('selectionChanged', () => {
            this.totalSelect = this.params.api.getSelectedRows().length;
        });
    }

    CheckedMode(e): void {
        e.preventDefault();
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

    private _getCurrentVisibility(): boolean {
        return this.params.columnApi.getColumn('selection').isVisible();
    }
    private _setColumnVisibility(columnKey: string, visible: boolean): void {
        this.params.columnApi.setColumnVisible(columnKey, visible);
    }
}
