import { LabelComponent } from '../components/label/label.component';
import { ImageComponent } from '../components/image/image.component';
import { TitleComponent } from '../components/title/title.component';
import { HeaderCheckboxComponent } from '../components/header-checkbox/header-checkbox.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';

export const dataColumns = [
    {
        headerName: '',
        field: 'selection',
        suppressMenu: true,
        width: 40,
        hide: true,
        cellRendererFramework: CheckboxComponent,
        headerRendererFramework: HeaderCheckboxComponent,
        headerComponentParams: (params) => {
            const displayedColumns = params.columnApi.getAllDisplayedColumns();
            return displayedColumns[0] === params.column;
        },
    },
    {
        headerName: '', field: 'image', width: 120, cellRendererFramework: ImageComponent
    },
    {
        headerName: 'Published on', field: 'publishedAt', cellRendererFramework: LabelComponent
    },
    {
        headerName: 'Video Title', field: 'title', cellStyle: { 'white-space': 'normal' }, cellRendererFramework: TitleComponent
    },
    {
        headerName: 'Description', field: 'description', cellStyle: { 'white-space': 'normal' }, cellRendererFramework: LabelComponent
    },
];
