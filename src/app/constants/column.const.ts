export const dataColumns = [
    {
        headerName: '',
        field: 'selection',
        checkboxSelection: true,
        sortable: false,
        filter: false,
        suppressMenu: true,
        width: 40,
        suppressSizeToFit: true,
        hide: true,
        headerComponentParams: (params) => {
            const displayedColumns = params.columnApi.getAllDisplayedColumns();
            return displayedColumns[0] === params.column;
        },
    },
    {
        headerName: '', field: 'image', width: 120, cellRenderer: (params) => {
            return params.column.colId === 'image' ? params.value : `<a href="${params.value}" target="_blank" rel="noopener">${params.value}</a>`;
        }
    },
    {
        headerName: 'Published on', field: 'publishedAt',
    },
    {
        headerName: 'Video Title', field: 'title', cellStyle: { 'white-space': 'normal' }, cellRenderer: (params) => {
            return params.column.colId === 'image' ? params.value : `<a href="${params.value}" target="_blank" rel="noopener">${params.value}</a>`;
        }
    },
    {
        headerName: 'Description', field: 'description', cellStyle: { 'white-space': 'normal' }
    },
];
