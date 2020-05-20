import {Component, ElementRef, ViewChild} from '@angular/core';
import { Params } from '../../models/models';

@Component({
  selector: 'app-header-checkbox-selection',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
    params: Params;
    ascSort: string;
    descSort: string;
    noSort: string;
    selectAll = false;
    @ViewChild('menuButton', {read: ElementRef, static: false}) public menuButton;

    get isCheckboxVisible(): boolean {
        const {headerComponentParams} = this.params.column.colDef;
        if (typeof headerComponentParams === 'function') {
            this.params.column.colDef.suppressToolPanel = true;
            return headerComponentParams(this.params);
        }
        return false;
    }

    agInit(params: Params): void {
        this.params = params;
        params.column.addEventListener('sortChanged', () => {
            this.ascSort = this.descSort = this.noSort = 'inactive';
            if (this.params.column.isSortAscending()) {
                this.ascSort = 'active';
            } else if (this.params.column.isSortDescending()) {
                this.descSort = 'active';
            } else {
                this.noSort = 'active';
            }
        });
        params.api.addEventListener('selectionChanged', () => {
            this.selectAll = this.params.api.getSelectedRows().length === this.params.api.getDisplayedRowCount();
        });
    }

    onMenuClicked(): void {
        this.params.showColumnMenu(this.menuButton.nativeElement);
    }

    onSortRequested(order, event): void {
        this.params.setSort(order, event.shiftKey);
    }

    onChange(event): void {
        event.preventDefault();
        if (this.selectAll) {
        this.params.api.selectAll();
        } else {
        this.params.api.deselectAll();
        }
    }
}
