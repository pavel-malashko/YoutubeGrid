import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';
import { CustomToolBarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { WindowRef } from './windowRef';
import { LabelComponent } from './components/label/label.component';
import { TitleComponent } from './components/title/title.component';
import { ImageComponent } from './components/image/image.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { HeaderCheckboxComponent } from './components/header-checkbox/header-checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomToolBarComponent,
    CheckboxComponent,
    LabelComponent,
    TitleComponent,
    ImageComponent,
    HeaderCheckboxComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([ CustomToolBarComponent, LabelComponent, CheckboxComponent,  TitleComponent, ImageComponent, HeaderCheckboxComponent ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    WindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
