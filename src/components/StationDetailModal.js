import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton,
  Card,
  CardMedia,
  Chip,
  Divider
} from '@mui/material';
import {
  Close,
  Save,
  PhotoCamera,
  Delete,
  LocationOn,
  Numbers,
  CalendarToday
} from '@mui/icons-material';

const StationDetailModal = ({ station, visitData, onSave, onClose }) => {
  const [visited, setVisited] = useState(visitData?.visited || false);
  const [visitDate, setVisitDate] = useState(visitData?.visitDate || '');
  const [notes, setNotes] = useState(visitData?.notes || '');
  const [photos, setPhotos] = useState(visitData?.photos || []);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    onSave(station.id, {
      visited,
      visitDate: visited ? visitDate : '',
      notes,
      photos
    });
    onClose();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            name: file.name,
            url: e.target.result,
            size: file.size
          };
          setPhotos(prev => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      }
    });
    
    event.target.value = '';
  };

  const handlePhotoAdd = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            name: file.name,
            url: e.target.result,
            size: file.size
          };
          setPhotos(prev => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(93, 64, 55, 0.1)',
          maxHeight: '90vh'
        }
      }}
    >
      {/* ヘッダー */}
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #5D4037 0%, #8D6E63 100%)',
          color: 'white',
          p: 3,
          position: 'relative'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {station.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 0.5 }}>
              詳細情報の編集
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* 基本情報セクション */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            基本情報
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  読み方:
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {station.reading}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOn sx={{ color: 'secondary.main', fontSize: '1rem' }} />
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {station.location}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Numbers sx={{ color: 'secondary.main', fontSize: '1rem' }} />
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  第{station.number}宿
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3, borderColor: 'rgba(93, 64, 55, 0.1)' }} />

        {/* 訪問状態セクション */}
        <Box sx={{ mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={visited}
                onChange={(e) => setVisited(e.target.checked)}
                sx={{
                  color: 'primary.main',
                  '&.Mui-checked': {
                    color: 'accent.main',
                  }
                }}
              />
            }
            label={
              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                訪問済み
              </Typography>
            }
          />
        </Box>

        {/* 訪問日セクション */}
        {visited && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="body1"
              sx={{ color: 'text.primary', fontWeight: 500, mb: 1 }}
            >
              訪問日
            </Typography>
            <TextField
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <CalendarToday sx={{ color: 'accent.main', mr: 1 }} />
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  }
                }
              }}
            />
          </Box>
        )}

        {/* メモセクション */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body1"
            sx={{ color: 'text.primary', fontWeight: 500, mb: 1 }}
          >
            メモ・感想
          </Typography>
          <TextField
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="訪問時の感想や特記事項を入力してください"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                }
              }
            }}
          />
        </Box>

        {/* 写真セクション */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body1"
            sx={{ color: 'text.primary', fontWeight: 500, mb: 2 }}
          >
            写真
          </Typography>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {/* 写真アップロードエリア */}
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
              border: '2px dashed',
              borderColor: 'secondary.light',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              backgroundColor: 'rgba(117, 117, 117, 0.05)',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(93, 64, 55, 0.05)'
              },
              transition: 'all 0.3s ease',
              mb: 2
            }}
            onClick={handlePhotoAdd}
          >
            <PhotoCamera sx={{ fontSize: '3rem', color: 'secondary.main', mb: 1 }} />
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 0.5 }}>
              写真を追加してください
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              クリックまたはドラッグ&ドロップ
            </Typography>
          </Box>

          {/* 写真プレビューグリッド */}
          {photos.length > 0 && (
            <Grid container spacing={2}>
              {photos.map((photo) => (
                <Grid item xs={6} sm={4} md={3} key={photo.id}>
                  <Card
                    elevation={0}
                    sx={{
                      position: 'relative',
                      borderRadius: 2,
                      border: '1px solid rgba(93, 64, 55, 0.1)',
                      overflow: 'hidden'
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="120"
                      image={photo.url}
                      alt={photo.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Box sx={{ p: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.primary',
                          fontWeight: 500,
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {photo.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', fontSize: '0.7rem' }}
                      >
                        {formatFileSize(photo.size)}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => removePhoto(photo.id)}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        width: 24,
                        height: 24,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 87, 34, 0.8)'
                        }
                      }}
                    >
                      <Delete sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          <Button
            variant="outlined"
            startIcon={<PhotoCamera />}
            onClick={handlePhotoAdd}
            sx={{
              mt: 2,
              color: 'accent.main',
              borderColor: 'accent.main',
              '&:hover': {
                backgroundColor: 'accent.main',
                color: 'white'
              }
            }}
          >
            写真を選択
          </Button>
        </Box>
      </DialogContent>

      {/* フッター */}
      <DialogActions
        sx={{
          p: 3,
          background: 'rgba(93, 64, 55, 0.02)',
          borderTop: '1px solid rgba(93, 64, 55, 0.1)'
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: 'secondary.main',
            borderColor: 'secondary.main',
            borderRadius: 2,
            px: 3
          }}
        >
          キャンセル
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<Save />}
          sx={{
            background: 'linear-gradient(135deg, #5D4037 0%, #8D6E63 100%)',
            borderRadius: 2,
            px: 3,
            '&:hover': {
              background: 'linear-gradient(135deg, #3E2723 0%, #5D4037 100%)'
            }
          }}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StationDetailModal;
