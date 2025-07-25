import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { ViewList, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

const FilterTabs = ({ filter, onFilterChange }) => {
  const tabs = [
    { label: 'すべて', value: 'すべて', icon: <ViewList /> },
    { label: '訪問済み', value: '訪問済み', icon: <CheckCircle /> },
    { label: '未訪問', value: '未訪問', icon: <RadioButtonUnchecked /> }
  ];

  const handleChange = (event, newValue) => {
    onFilterChange(newValue);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Paper
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(93, 64, 55, 0.1)',
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >
        <Tabs
          value={filter}
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              background: 'linear-gradient(90deg, #FF8A65 0%, #FF5722 100%)',
              borderRadius: '3px 3px 0 0'
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              color: 'text.secondary',
              py: 2,
              minHeight: 'auto',
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600
              },
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'rgba(93, 64, 55, 0.05)'
              },
              transition: 'all 0.3s ease'
            }
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {React.cloneElement(tab.icon, { 
                    sx: { 
                      fontSize: '1.2rem',
                      color: filter === tab.value ? 'primary.main' : 'text.secondary'
                    } 
                  })}
                  <span>{tab.label}</span>
                </Box>
              }
              value={tab.value}
            />
          ))}
        </Tabs>
      </Paper>
    </Box>
  );
};

export default FilterTabs;
