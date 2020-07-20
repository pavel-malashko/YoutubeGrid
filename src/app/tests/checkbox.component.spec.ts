import {CheckboxComponent} from '../components/checkbox/checkbox.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';

describe('CheckboxComponent', () => {
    let fixture: ComponentFixture<CheckboxComponent>;
    let component: CheckboxComponent;
    let input;

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                AgGridModule
            ],
            declarations: [CheckboxComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CheckboxComponent);
        component = fixture.componentInstance;
        input = fixture.debugElement.nativeElement.querySelector('#checkNode');
        fixture.detectChanges();
    }));

    it('should change checkbox value', () => {
        setTimeout(() => {
            expect(input.checked).toBeFalsy();
            input.click();
            fixture.detectChanges();
            expect(input).toBeTruthy();
        }, 1000);
    });
});
