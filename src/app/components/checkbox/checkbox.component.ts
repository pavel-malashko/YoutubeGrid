import {Component, ElementRef, ViewChild} from '@angular/core';
import { Params } from '../../models/models';
import { RowNode } from 'ag-grid-community';

@Component({
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
    params: Params;
    node: RowNode;
    get isCheckboxVisible(): boolean {
        const {headerComponentParams} = this.params.column.colDef;
        if (typeof headerComponentParams === 'function') {
            this.params.column.colDef.suppressToolPanel = true;
            return headerComponentParams(this.params);
        }
        return false;
    }

    get checkboxValue(): boolean {
        return this.node.isSelected();
    }

    agInit(params: Params): void {
        this.params = params;
        this.node = params.node;
    }
    onChange() {
        this.node.setSelected(!this.checkboxValue);
    }
}
