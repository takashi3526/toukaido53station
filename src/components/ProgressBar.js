import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid
} from '@mui/material';

const ProgressBar = ({ visited, total }) => {
  const percentage = Math.round((visited / total) * 100);
  
  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(93, 64, 55, 0.1)',
        borderRadius: 3
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          {/* 統計情報 */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    sx={{
                      color: 'accent.main',
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      mb: 0.5
                    }}
                  >
                    {visited}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      letterSpacing: '0.02em'
                    }}
                  >
                    訪問済み
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={4}>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    sx={{
                      color: 'secondary.main',
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      mb: 0.5
                    }}
                  >
                    {total - visited}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      letterSpacing: '0.02em'
                    }}
                  >
                    未訪問
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={4}>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      mb: 0.5
                    }}
                  >
                    {percentage}%
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      letterSpacing: '0.02em'
                    }}
                  >
                    達成率
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* プログレスバー */}
          <Grid item xs={12} md={4}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    mr: 2
                  }}
                >
                  進捗
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    ml: 'auto'
                  }}
                >
                  {visited} / {total}
                </Typography>
              </Box>
              
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(117, 117, 117, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #FF8A65 0%, #FF5722 100%)',
                    borderRadius: 5,
                    boxShadow: '0 2px 4px rgba(255, 138, 101, 0.3)'
                  }
                }}
              />
              
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                >
                  全{total}宿場中
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProgressBar;
