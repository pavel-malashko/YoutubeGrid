import { HeaderCheckboxComponent } from '../components/header-checkbox/header-checkbox.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

describe('HeaderCheckboxComponent', () => {
    let fixture: ComponentFixture<HeaderCheckboxComponent>;
    let component: HeaderCheckboxComponent;
    let input;

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                AgGridModule
            ],
            declarations: [HeaderCheckboxComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(HeaderCheckboxComponent);
        component = fixture.componentInstance;
        input = fixture.debugElement.nativeElement.querySelector('#mode');
        fixture.detectChanges();
    }));

    it('should create', () => {
        setTimeout(() =>  expect(component.params).toBeTruthy(), 1000);
    });

    it('should change checkbox value', () => {
        setTimeout(() => {
            expect(input.checked).toBeFalsy();
            input.click();
            fixture.detectChanges();
            expect(input).toBeTruthy();
        }, 1000);
    });

    it('onChange test call child methods', () => {
        setTimeout(() => {
            component.onChange();
            if (component.selectAll) {
                expect(component.params.api.selectAll).toHaveBeenCalled();
            } else {
                expect(component.params.api.deselectAll).toHaveBeenCalled();
            }
        } , 1000);
    });

    it('add EventListener to change checkbox', () => {
        setTimeout(() => {
            spyOn(component.params.api, 'addEventListener').and.callThrough();
            const selectAll = component.params.api.getSelectedRows().length === component.params.api.getDisplayedRowCount();
            if (selectAll) {
                expect(component.selectAll).toBeTruthy();
            }
        } , 1000);
    });

    it('check input Toolbal after agTnit', () => {
        setTimeout(() => {
            expect(input.checked).toBeFalsy();
        } , 1000);
    });

    it('check addEventListeners', () => {
        setTimeout(() => {
            component.params.api.dispatchEvent(new Event('selectionChanged'));
            expect(component.selectAll).toBe(component.params.api.getSelectedRows().length === component.params.api.getDisplayedRowCount());
        } , 1000);
    });
});
