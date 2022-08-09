import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import renderCellExpand from "./CellRenderer";

const SCHEMA = [
  {
    field: 'createdAt',
    headerName: 'Timestamp',
    width: 160
  },
  {
    field: 'origin',
    headerName: 'Origin Address',
    width: 270,
    renderCell: renderCellExpand
  },
  {
    field: 'destination',
    headerName: 'Destination Address',
    width: 270,
    renderCell: renderCellExpand
  },
  {
    field: 'distance',
    headerName: 'Distance (km)',
    width: 110
  }
];


const HistoricalResults = () => {
  const [entries, setEntries] = useState([]);
  
  useEffect( () => {
    fetch(
      'http://localhost:3001/entries'
    )
    .then( response => response.json())
    .then( data => {
      setEntries(data);
    })
    .catch( err => {
      console.log("Error ", err);
    })
  }, []);
  
  return (
    <Box sx={{ height: 400, width: '60em' }}>
      <DataGrid
        row--dynamicHeight
        rows={entries}
        columns={SCHEMA}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
}


export default HistoricalResults;