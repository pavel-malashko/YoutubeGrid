import { Component } from '@angular/core';
import { Params } from 'src/app/models/models';

@Component({
    templateUrl: './label.component.html',
})

export class LabelComponent {
    value: string;
    constructor() {}
    agInit(params: Params): void {
        this.value = params.value;
    }
}
