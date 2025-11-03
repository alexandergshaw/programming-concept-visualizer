'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DataObjectIcon from '@mui/icons-material/DataObject';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function DataFlowVisualizer() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const mockFetchData = () => {
    setLoading(true);
    setStep(1);

    setTimeout(() => {
      setStep(2);
      const mockData: User[] = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
        { id: 3, name: 'Carol Davis', email: 'carol@example.com' },
      ];
      setUserData(mockData);
      
      setTimeout(() => {
        setStep(3);
        setTimeout(() => {
          setStep(4);
          setLoading(false);
        }, 600);
      }, 600);
    }, 800);
  };

  const reset = () => {
    setStep(0);
    setUserData([]);
    setLoading(false);
  };

  return (
    <Box sx={{ my: 4 }}>
      {/* Control Panel */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 5, 
        justifyContent: 'center',
        alignItems: 'center' 
      }}>
        <Button 
          variant="contained" 
          onClick={mockFetchData} 
          disabled={loading}
          startIcon={<RocketLaunchIcon />}
          size="large"
          sx={{ 
            textTransform: 'none', 
            px: 5, 
            py: 2, 
            fontSize: '1.1rem',
            borderRadius: 3,
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            boxShadow: '0 3px 15px rgba(30, 64, 175, 0.25)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 5px 20px rgba(30, 64, 175, 0.35)',
            },
            transition: 'all 0.3s'
          }}
        >
          {step === 0 ? 'Launch Data Flow' : 'In Progress...'}
        </Button>
        {step === 4 && (
          <Button 
            variant="outlined" 
            onClick={reset}
            size="large"
            sx={{ 
              textTransform: 'none', 
              px: 4, 
              py: 2,
              borderRadius: 3,
              borderWidth: 2,
              borderColor: '#475569',
              color: '#475569',
              '&:hover': {
                borderWidth: 2,
                borderColor: '#1e293b',
                backgroundColor: '#f8fafc',
                transform: 'translateY(-2px)',
              }
            }}
          >
            ↺ Reset
          </Button>
        )}
      </Box>

      {/* Modern Flow Visualization */}
      <Box sx={{ 
        position: 'relative',
        display: 'flex', 
        gap: 0, 
        alignItems: 'stretch',
        justifyContent: 'center',
        mb: 5,
        minHeight: '320px'
      }}>
        {/* Connection Lines */}
        {step >= 2 && (
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '4px',
            background: `linear-gradient(to right, 
              ${step >= 2 ? '#0f766e' : '#e5e7eb'} 0%, 
              ${step >= 2 ? '#0f766e' : '#e5e7eb'} 33%,
              ${step >= 3 ? '#1e40af' : '#e5e7eb'} 33%,
              ${step >= 3 ? '#1e40af' : '#e5e7eb'} 66%,
              ${step >= 4 ? '#6366f1' : '#e5e7eb'} 66%,
              ${step >= 4 ? '#6366f1' : '#e5e7eb'} 100%
            )`,
            zIndex: 0,
            borderRadius: 2,
          }} />
        )}

        {/* Stage 1: API */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              width: '200px',
              p: 3,
              borderRadius: 4,
              background: step >= 1 ? 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)' : 'white',
              border: step >= 1 ? 'none' : '3px dashed #cbd5e1',
              color: step >= 1 ? 'white' : '#64748b',
              transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transform: step >= 1 ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
              boxShadow: step >= 1 ? '0 20px 40px rgba(15, 118, 110, 0.3)' : 'none',
              cursor: step >= 1 ? 'pointer' : 'default',
              '&:hover': step >= 1 ? {
                transform: 'scale(1.08) translateY(-12px)',
                boxShadow: '0 25px 50px rgba(15, 118, 110, 0.4)',
              } : {}
            }}
          >
            <Box sx={{ 
              width: 70, 
              height: 70, 
              margin: '0 auto 16px',
              borderRadius: '50%',
              background: step >= 1 ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}>
              <DataObjectIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
              API Server
            </Typography>
            <Typography variant="caption" sx={{ textAlign: 'center', display: 'block', opacity: 0.9 }}>
              {step >= 1 ? 'Fetching users...' : 'Idle'}
            </Typography>
            {step >= 2 && (
              <Chip 
                label="✓ Success" 
                size="small"
                sx={{ 
                  mt: 2, 
                  width: '100%',
                  background: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            )}
            
            {/* Data Visualization */}
            {step >= 2 && (
              <Box sx={{ 
                mt: 2, 
                p: 1.5, 
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.2)',
                animation: 'slideIn 0.4s ease-out'
              }}>
                <Typography variant="caption" sx={{ fontSize: '0.7rem', fontFamily: 'monospace', display: 'block', mb: 0.5, opacity: 0.8 }}>
                  Response:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                  {[1, 2, 3].map((i) => (
                    <Box key={i} sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 0.5
                    }}>
                      <Box sx={{ 
                        width: 4, 
                        height: 4, 
                        borderRadius: '50%', 
                        background: 'white',
                        opacity: 0.8
                      }} />
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', fontFamily: 'monospace', opacity: 0.9 }}>
                        User {i}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* Stage 2: Redux */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              width: '200px',
              p: 3,
              borderRadius: 4,
              background: step >= 3 ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' : 'white',
              border: step >= 3 ? 'none' : '3px dashed #cbd5e1',
              color: step >= 3 ? 'white' : '#64748b',
              transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transform: step >= 3 ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
              boxShadow: step >= 3 ? '0 20px 40px rgba(30, 64, 175, 0.3)' : 'none',
              cursor: step >= 3 ? 'pointer' : 'default',
              '&:hover': step >= 3 ? {
                transform: 'scale(1.08) translateY(-12px)',
                boxShadow: '0 25px 50px rgba(30, 64, 175, 0.4)',
              } : {}
            }}
          >
            <Box sx={{ 
              width: 70, 
              height: 70, 
              margin: '0 auto 16px',
              borderRadius: '50%',
              background: step >= 3 ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}>
              <Box sx={{ fontSize: 40 }}>🗄️</Box>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
              Redux Store
            </Typography>
            <Typography variant="caption" sx={{ textAlign: 'center', display: 'block', opacity: 0.9 }}>
              {step >= 3 ? 'State updated' : 'Waiting...'}
            </Typography>
            {step >= 3 && (
              <Chip 
                label={`${userData.length} users`}
                size="small"
                sx={{ 
                  mt: 2, 
                  width: '100%',
                  background: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            )}
            
            {/* Data Visualization */}
            {step >= 3 && (
              <Box sx={{ 
                mt: 2, 
                p: 1.5, 
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.2)',
                animation: 'slideIn 0.4s ease-out'
              }}>
                <Typography variant="caption" sx={{ fontSize: '0.7rem', fontFamily: 'monospace', display: 'block', mb: 0.5, opacity: 0.8 }}>
                  state.users:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                  {userData.map((user) => (
                    <Box key={user.id} sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 0.5,
                      p: 0.5,
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: 1
                    }}>
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', fontFamily: 'monospace', opacity: 0.9 }}>
                        id: {user.id}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* Stage 3: UI */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              width: '200px',
              p: 3,
              borderRadius: 4,
              background: step >= 4 ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' : 'white',
              border: step >= 4 ? 'none' : '3px dashed #cbd5e1',
              color: step >= 4 ? 'white' : '#64748b',
              transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transform: step >= 4 ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
              boxShadow: step >= 4 ? '0 20px 40px rgba(79, 70, 229, 0.3)' : 'none',
              cursor: step >= 4 ? 'pointer' : 'default',
              '&:hover': step >= 4 ? {
                transform: 'scale(1.08) translateY(-12px)',
                boxShadow: '0 25px 50px rgba(79, 70, 229, 0.4)',
              } : {}
            }}
          >
            <Box sx={{ 
              width: 70, 
              height: 70, 
              margin: '0 auto 16px',
              borderRadius: '50%',
              background: step >= 4 ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}>
              <Box sx={{ fontSize: 40 }}>⚛️</Box>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
              React UI
            </Typography>
            <Typography variant="caption" sx={{ textAlign: 'center', display: 'block', opacity: 0.9 }}>
              {step >= 4 ? 'Rendered!' : 'Waiting...'}
            </Typography>
            {step >= 4 && (
              <Chip 
                label="✓ Live" 
                size="small"
                sx={{ 
                  mt: 2, 
                  width: '100%',
                  background: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            )}
            
            {/* Data Visualization */}
            {step >= 4 && (
              <Box sx={{ 
                mt: 2, 
                p: 1.5, 
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.2)',
                animation: 'slideIn 0.4s ease-out'
              }}>
                <Typography variant="caption" sx={{ fontSize: '0.7rem', fontFamily: 'monospace', display: 'block', mb: 0.5, opacity: 0.8 }}>
                  Rendered:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                  {userData.map((user) => (
                    <Box key={user.id} sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 0.5,
                      p: 0.5,
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: 1
                    }}>
                      <AccountCircleIcon sx={{ fontSize: 12, opacity: 0.8 }} />
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', fontFamily: 'monospace', opacity: 0.9 }}>
                        {user.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* User Cards Display */}
      {step >= 4 && userData.length > 0 && (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 3,
          mt: 5
        }}>
          {userData.map((user, index) => (
            <Box
              key={user.id}
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '2px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                animation: 'popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                animationDelay: `${index * 0.15}s`,
                animationFillMode: 'backwards',
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 12px 30px rgba(30, 64, 175, 0.25)',
                  borderColor: '#3b82f6',
                }
              }}
            >
              <Box sx={{ 
                width: 60, 
                height: 60, 
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(30, 64, 175, 0.2)'
              }}>
                <AccountCircleIcon sx={{ fontSize: 35, color: 'white' }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  {user.email}
                </Typography>
              </Box>
              <Chip 
                label={`#${user.id}`}
                sx={{
                  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  px: 1
                }}
              />
            </Box>
          ))}
        </Box>
      )}

      <style jsx global>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}