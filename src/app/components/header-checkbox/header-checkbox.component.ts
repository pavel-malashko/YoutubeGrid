import {Component, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import { Params } from '../../models/models';

@Component({
  selector: 'app-header-checkbox-selection',
  templateUrl: './header-checkbox.component.html',
  styleUrls: ['./header-checkbox.component.scss']
})
export class HeaderCheckboxComponent implements OnDestroy {
    params: Params;
    ascSort: string;
    descSort: string;
    noSort: string;
    selectAll = false;
    @ViewChild('menuButton', {read: ElementRef, static: false}) public menuButton;

    get isCheckboxVisible(): boolean {
        // console.log(this.params);
        const {headerComponentParams} = this.params.column.colDef;
        if (typeof headerComponentParams === 'function') {
            this.params.column.colDef.suppressToolPanel = true;
            return headerComponentParams(this.params);
        }
        return false;
    }

    agInit(params: Params): void {
        this.params = params;
        params.api.addEventListener('selectionChanged', this.selectAllChecked.bind(this)  );
    }

    onMenuClicked(): void {
        this.params.showColumnMenu(this.menuButton.nativeElement);
    }

    onChange(): void {
        if (this.selectAll) {
            this.params.api.selectAll();
        } else {
            this.params.api.deselectAll();
        }
    }

    selectAllChecked(): void {
        this.selectAll = this.params.api.getSelectedRows().length === this.params.api.getDisplayedRowCount();
    }

    ngOnDestroy() {
        this.params.api.removeEventListener('selectionChanged', this.selectAllChecked.bind(this) );
    }
}
