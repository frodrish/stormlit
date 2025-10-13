import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AgGridWrapper({ rowData,columnDefs }) {

  return (
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
      />
  );
}
