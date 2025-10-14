import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AgGridWrapper({url, rowData = [],columnDefs }) {

    const [rows, setRows] = useState(rowData || []);

    useEffect(() => {
        if (url) {
            fetch(url)
                .then(response => response.json())
                .then(data => setRows(data))
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setRows([]);
                });
        } else {
            setRows(rows || []);
        }
    }, [url]);

    return (
      <AgGridReact
        rowData={rows}
        columnDefs={columnDefs}
        domLayout="autoHeight"
      />
    );
}
