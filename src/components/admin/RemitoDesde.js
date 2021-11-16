import * as React from 'react';
import {
    Typography,
    TextField,
    Box,
  } from '@material-ui/core';
  import AdapterDateFns from '@mui/lab/AdapterDateFns';
  import LocalizationProvider from '@mui/lab/LocalizationProvider';
  import DateRangePicker from '@mui/lab/DateRangePicker';

export default function RemitoDesde() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <Typography  variant="h4" sx={{ mt: 2, mb: 1 }}>Seleccione el intervalo de fechas de los remitos a solicitar: </Typography>
        <DateRangePicker
          startText="Fecha Inicial"
          endText="Fecha Final"
          calendars={1}
          value={value}
          inputFormat="dd/MM/yyyy"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(InicioProps, HastaProps) => (
            <React.Fragment>
              <TextField {...InicioProps} />
              <Box sx={{ mx: 2 }}> hasta </Box>
              <TextField {...HastaProps} />
            </React.Fragment>
          )}
        />
      </div>
    </LocalizationProvider>
  );
}