import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

const Header = ({ user, onLogout }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #3E2723 0%, #5D4037 50%, #8D6E63 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'white',
                letterSpacing: '0.05em',
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              東海道五十三次
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem',
                letterSpacing: '0.02em',
                mt: 0.5
              }}
            >
              江戸時代の東海道を辿る旅の記録
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                fontWeight: 500,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              こんにちは、{user}さん
            </Typography>
            
            <Button
              variant="outlined"
              startIcon={<ExitToApp />}
              onClick={onLogout}
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: 2,
                px: 2,
                py: 0.5,
                fontWeight: 500,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                ログアウト
              </Box>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
