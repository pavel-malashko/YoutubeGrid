import { Injectable } from '@angular/core';

const _window = () => {
   return window;
};

@Injectable()

export class WindowRef {
    get nativeWindow(): Window {
        return _window();
    }
}
