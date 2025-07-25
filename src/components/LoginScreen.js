import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Container
} from '@mui/material';
import { PersonOutline, LockOutlined } from '@mui/icons-material';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #8D6E63 0%, #5D4037 50%, #3E2723 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={0}
          sx={{
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: '1px solid rgba(93, 64, 55, 0.1)'
          }}
        >
          <CardContent>
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 1,
                  letterSpacing: '0.05em'
                }}
              >
                東海道五十三次
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  letterSpacing: '0.02em'
                }}
              >
                宿場町巡りの記録
              </Typography>
              <Box
                sx={{
                  width: 60,
                  height: 3,
                  backgroundColor: 'accent.main',
                  margin: '16px auto',
                  borderRadius: 2
                }}
              />
            </Box>

            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="ユーザー名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                  }
                }}
                placeholder="ユーザー名を入力してください"
              />

              <TextField
                fullWidth
                type="password"
                label="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                  }
                }}
                placeholder="パスワードを入力してください"
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleLogin}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #5D4037 0%, #8D6E63 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3E2723 0%, #5D4037 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 8px 16px rgba(93, 64, 55, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                ログイン
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginScreen;
