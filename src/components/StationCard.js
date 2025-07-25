import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import {
  LocationOn,
  Edit,
  CheckCircle,
  RadioButtonUnchecked,
  CalendarToday
} from '@mui/icons-material';

const StationCard = ({ station, visitData, onToggleVisit, onEditDetails }) => {
  const isVisited = visitData && visitData.visited;
  
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        background: isVisited 
          ? 'linear-gradient(135deg, rgba(255, 138, 101, 0.05) 0%, rgba(255, 255, 255, 0.9) 100%)'
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: isVisited 
          ? '2px solid rgba(255, 138, 101, 0.3)'
          : '1px solid rgba(93, 64, 55, 0.1)',
        borderRadius: 3,
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isVisited
            ? '0 12px 24px rgba(255, 138, 101, 0.2)'
            : '0 12px 24px rgba(93, 64, 55, 0.1)',
          '& .edit-button': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        transition: 'all 0.3s ease'
      }}
    >
      {/* 宿場番号バッジ */}
      <Chip
        label={`第${station.number}宿`}
        size="small"
        sx={{
          position: 'absolute',
          top: -8,
          right: 16,
          backgroundColor: 'primary.main',
          color: 'white',
          fontWeight: 600,
          fontSize: '0.75rem',
          zIndex: 1,
          boxShadow: '0 2px 8px rgba(93, 64, 55, 0.3)'
        }}
      />

      <CardContent sx={{ p: 3 }}>
        {/* ヘッダー部分 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1.5rem',
                mb: 0.5,
                letterSpacing: '0.02em'
              }}
            >
              {station.name}
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.9rem',
                mb: 1,
                letterSpacing: '0.05em'
              }}
            >
              読み方: {station.reading}
            </Typography>
          </Box>

          {/* 訪問状態チェックボタン */}
          <IconButton
            onClick={() => onToggleVisit(station.id)}
            sx={{
              color: isVisited ? 'accent.main' : 'secondary.main',
              '&:hover': {
                backgroundColor: isVisited 
                  ? 'rgba(255, 138, 101, 0.1)' 
                  : 'rgba(117, 117, 117, 0.1)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {isVisited ? (
              <CheckCircle sx={{ fontSize: '2rem' }} />
            ) : (
              <RadioButtonUnchecked sx={{ fontSize: '2rem' }} />
            )}
          </IconButton>
        </Box>

        {/* 所在地情報 */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOn sx={{ color: 'secondary.main', mr: 1, fontSize: '1.2rem' }} />
          <Typography
            variant="body2"
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              letterSpacing: '0.02em'
            }}
          >
            {station.location}
          </Typography>
        </Box>

        {/* 訪問日表示 */}
        {isVisited && visitData?.visitDate && (
          <>
            <Divider sx={{ my: 2, borderColor: 'rgba(93, 64, 55, 0.1)' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarToday sx={{ color: 'accent.main', mr: 1, fontSize: '1.1rem' }} />
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  fontWeight: 500
                }}
              >
                訪問日: {visitData.visitDate}
              </Typography>
            </Box>
          </>
        )}

        {/* 訪問状態表示 */}
        <Box sx={{ mb: 2 }}>
          <Chip
            label={isVisited ? '訪問済み' : '未訪問'}
            size="small"
            variant={isVisited ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: isVisited ? 'accent.main' : 'transparent',
              color: isVisited ? 'white' : 'secondary.main',
              borderColor: isVisited ? 'accent.main' : 'secondary.main',
              fontWeight: 500,
              fontSize: '0.8rem'
            }}
          />
        </Box>

        {/* アクションボタン */}
        <Button
          className="edit-button"
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => onEditDetails(station)}
          fullWidth
          sx={{
            color: 'primary.main',
            borderColor: 'primary.main',
            borderRadius: 2,
            py: 1,
            fontWeight: 500,
            textTransform: 'none',
            opacity: 0.7,
            transform: 'translateY(4px)',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'white',
              borderColor: 'primary.main',
              opacity: 1,
              transform: 'translateY(0)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          詳細編集
        </Button>
      </CardContent>
    </Card>
  );
};

export default StationCard;
