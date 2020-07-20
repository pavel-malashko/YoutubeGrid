import { Component } from '@angular/core';

@Component({
    templateUrl: './image.component.html',
})

export class ImageComponent  {
    value: string;
    link: string;
    constructor() {}
    agInit(params: any): void {
        this.link = params.data.title;
        this.value = params.value;
    }
}
