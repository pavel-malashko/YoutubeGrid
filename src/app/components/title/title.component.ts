import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    templateUrl: './title.component.html',
})

export class TitleComponent implements ICellRendererAngularComp  {
    value: string;
    constructor() {}
    agInit(params: any): void {
        this.value = params.value;
    }

    refresh(params: any): boolean {
        return false;
    }
}
