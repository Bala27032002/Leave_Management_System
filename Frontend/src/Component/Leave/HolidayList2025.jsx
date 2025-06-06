import React, { useState } from 'react';
import {
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Typography,
  Button,
} from '@mui/material';

const holidayList2025 = [
  { id: 1, occasion: "New Year", date: "01-01-2025", day: "Wednesday" },
  { id: 2, occasion: "Pongal", date: "14-01-2025", day: "Tuesday" },
  { id: 3, occasion: "Republic Day", date: "26-01-2025", day: "Sunday" },
  { id: 4, occasion: "Ramzan", date: "31-03-2025", day: "Monday" },
  { id: 5, occasion: "Tamil New Year", date: "14-04-2025", day: "Monday" },
  { id: 6, occasion: "May Day", date: "01-05-2025", day: "Thursday" },
  { id: 7, occasion: "Independence Day", date: "15-08-2025", day: "Friday" },
  { id: 8, occasion: "Gandhi Jayanti", date: "02-10-2025", day: "Thursday" },
  { id: 9, occasion: "Diwali", date: "20-10-2025", day: "Monday" },
  { id: 10, occasion: "Christmas", date: "25-12-2025", day: "Thursday" },
];

const HolidayList2025 = () => {
  const [search, setSearch] = useState('');

  const filteredHolidays = holidayList2025.filter(item =>
    item.occasion.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Holiday
      </Typography>

      <Box
        sx={{
          background: '#fff',
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#7B61FF' }}>
            Show 10 rows
          </Button>

          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Occasion</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHolidays.map((holiday, index) => (
                <TableRow key={holiday.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{holiday.occasion}</TableCell>
                  <TableCell>{holiday.date}</TableCell>
                  <TableCell>{holiday.day}</TableCell>
                </TableRow>
              ))}
              {filteredHolidays.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No holidays found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default HolidayList2025;
