import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { CustomToolBarComponent } from '../components/toolbar/toolbar.component';

describe('CustomToolBarComponent', () => {
    let fixture: ComponentFixture<CustomToolBarComponent>;
    let component: CustomToolBarComponent;
    let input;

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                AgGridModule
            ],
            declarations: [CustomToolBarComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CustomToolBarComponent);
        component = fixture.componentInstance;
        input = fixture.debugElement.nativeElement.querySelector('#checkNode');
        fixture.detectChanges();
    }));

    it('check method checkedMode', () => {
        setTimeout(() => {
            component.checkedMode();
            const visible = component.params.columnApi.getColumn('selection').isVisible();
            if (visible) {
                expect(component.params.api.deselectAll).toHaveBeenCalled();
            }
            expect(component.params.api.deselectAll).toHaveBeenCalled();
            expect(component.params.columnApi.setColumnVisible).toHaveBeenCalledWith('selection', !visible);
        }, 1000);
    });

    it('checkbox value after agInit', () => {
        setTimeout(() => {
           expect(component.selectedMode).toBeFalsy();
        }, 1000);
    });

    it('check Events', () => {
        setTimeout(() => {
            component.params.api.dispatchEvent(new Event('modelUpdated'));
            expect(component.totalRecord).toBe(this.params.api.getDisplayedRowCount());
            component.params.api.dispatchEvent(new Event('selectionChanged'));
            expect(component.totalSelect).toBe(this.params.api.getSelectedRows());
        }, 1000);
    });
});
