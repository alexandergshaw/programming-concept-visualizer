'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string;
}

export default function SaveUpdateCycleVisualizer() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    bio: 'Software Developer'
  });
  const [editedBio, setEditedBio] = useState(profile.bio);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSave = () => {
    setIsAnimating(true);
    
    // Step 1: User clicks save
    setStep(1);
    
    setTimeout(() => {
      // Step 2: POST request to backend
      setStep(2);
      
      setTimeout(() => {
        // Step 3: Backend saves and responds
        setStep(3);
        
        setTimeout(() => {
          // Step 4: GET request for updated state
          setStep(4);
          
          setTimeout(() => {
            // Step 5: Redux updates
            setStep(5);
            
            setTimeout(() => {
              // Step 6: UI re-renders
              setStep(6);
              setProfile({ ...profile, bio: editedBio });
              setIsAnimating(false);
            }, 600);
          }, 600);
        }, 600);
      }, 800);
    }, 500);
  };

  const reset = () => {
    setStep(0);
    setEditedBio('Software Developer');
    setProfile({
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      bio: 'Software Developer'
    });
    setIsAnimating(false);
  };

  return (
    <Box sx={{ my: 4 }}>
      {/* Control Panel */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 5, 
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <TextField
          value={editedBio}
          onChange={(e) => setEditedBio(e.target.value)}
          disabled={isAnimating || step > 0}
          label="Edit Bio"
          variant="outlined"
          size="medium"
          sx={{ 
            minWidth: 300,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            }
          }}
        />
        <Button 
          variant="contained" 
          onClick={handleSave} 
          disabled={isAnimating || editedBio === profile.bio || step > 0}
          startIcon={<SaveIcon />}
          size="large"
          sx={{ 
            textTransform: 'none', 
            px: 4, 
            py: 1.5, 
            fontSize: '1rem',
            borderRadius: 3,
            background: 'linear-gradient(135deg, var(--info) 0%, var(--info) 100%)',
            boxShadow: '0 3px 15px rgba(30, 64, 175, 0.25)',
            '&:hover': {
              background: 'linear-gradient(135deg, var(--info) 0%, var(--info) 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 5px 20px rgba(30, 64, 175, 0.35)',
            },
            '&:disabled': {
              background: 'var(--line-strong)',
            },
            transition: 'all 0.3s'
          }}
        >
          Save Changes
        </Button>
        {step > 0 && (
          <Button 
            variant="outlined" 
            onClick={reset}
            size="large"
            sx={{ 
              textTransform: 'none', 
              px: 3, 
              py: 1.5,
              borderRadius: 3,
              borderWidth: 2,
              borderColor: 'var(--ink-soft)',
              color: 'var(--ink-soft)',
              '&:hover': {
                borderWidth: 2,
                borderColor: 'var(--ink)',
                backgroundColor: 'var(--paper-sunken)',
              }
            }}
          >
            Reset Demo
          </Button>
        )}
      </Box>

      {/* Flow Visualization */}
      <Box sx={{ position: 'relative', minHeight: '500px' }}>
        {/* Vertical Connection Line */}
        <Box sx={{
          position: 'absolute',
          left: '50%',
          top: '80px',
          transform: 'translateX(-50%)',
          width: '4px',
          height: step >= 1 ? `${Math.min(step, 6) * 70}px` : '0px',
          background: 'linear-gradient(to bottom, var(--info), var(--feature))',
          transition: 'height 0.5s ease-out',
          borderRadius: 2,
          zIndex: 0
        }} />

        {/* Step Indicators */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          
          {/* Step 1: User Action */}
          <Box sx={{ 
            width: '100%', 
            maxWidth: '600px',
            position: 'relative',
            zIndex: 1
          }}>
            <Box sx={{
              p: 3,
              borderRadius: 4,
              background: step >= 1 ? 'linear-gradient(135deg, var(--info) 0%, var(--feature) 100%)' : 'white',
              border: step >= 1 ? 'none' : '3px dashed var(--line-strong)',
              color: step >= 1 ? 'white' : 'var(--ink-soft)',
              transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transform: step >= 1 ? 'scale(1.02)' : 'scale(1)',
              boxShadow: step >= 1 ? '0 10px 30px rgba(79, 70, 229, 0.3)' : 'none',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: step >= 1 ? 'rgba(255,255,255,0.2)' : 'var(--paper-sunken)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}>
                  1
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  React UI - User Clicks Save
                </Typography>
              </Box>
              
              {step >= 1 && (
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 2,
                  animation: 'slideIn 0.4s ease-out'
                }}>
                  <Typography variant="caption" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', display: 'block', mb: 1, opacity: 0.9 }}>
                    Payload:
                  </Typography>
                  <Box sx={{ 
                    p: 1.5, 
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.7rem'
                  }}>
                    bio: "{editedBio}"
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* Step 2: POST Request */}
          <Box sx={{ 
            width: '100%', 
            maxWidth: '600px',
            position: 'relative',
            zIndex: 1
          }}>
            <Box sx={{
              p: 3,
              borderRadius: 4,
              background: step >= 2 ? 'linear-gradient(135deg, var(--success) 0%, var(--success) 100%)' : 'white',
              border: step >= 2 ? 'none' : '3px dashed var(--line-strong)',
              color: step >= 2 ? 'white' : 'var(--ink-soft)',
              transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transform: step >= 2 ? 'scale(1.02)' : 'scale(1)',
              boxShadow: step >= 2 ? '0 10px 30px rgba(15, 118, 110, 0.3)' : 'none',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: step >= 2 ? 'rgba(255,255,255,0.2)' : 'var(--paper-sunken)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}>
                  2
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  POST Request → Backend
                </Typography>
              </Box>
              
              {step >= 2 && (
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 2,
                  animation: 'slideIn 0.4s ease-out'
                }}>
                  <Typography variant="caption" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', display: 'block', mb: 1, opacity: 0.9 }}>
                    POST /api/users/1
                  </Typography>
                  <Box sx={{ 
                    p: 1.5, 
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.7rem'
                  }}>
                    {'{ bio: "' + editedBio + '" }'}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* Step 3: Backend Saves */}
          <Box sx={{ 
            width: '100%', 
            maxWidth: '600px',
            position: 'relative',
            zIndex: 1
          }}>
            <Box sx={{
              p: 3,
              borderRadius: 4,
              background: step >= 3 ? 'linear-gradient(135deg, var(--success) 0%, var(--success) 100%)' : 'white',
              border: step >= 3 ? 'none' : '3px dashed var(--line-strong)',
              color: step >= 3 ? 'white' : 'var(--ink-soft)',
              transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transform: step >= 3 ? 'scale(1.02)' : 'scale(1)',
              boxShadow: step >= 3 ? '0 10px 30px rgba(15, 118, 110, 0.3)' : 'none',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: step >= 3 ? 'rgba(255,255,255,0.2)' : 'var(--paper-sunken)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}>
                  3
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Backend Saves to Database
                </Typography>
              </Box>
              
              {step >= 3 && (
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 2,
                  animation: 'slideIn 0.4s ease-out'
                }}>
                  <Typography variant="caption" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', display: 'block', mb: 1, opacity: 0.9 }}>
                    Response: 200 OK
                  </Typography>
                  <Box sx={{ 
                    p: 1.5, 
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.7rem'
                  }}>
                    {'{ success: true }'}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* Step 4: GET Request */}
          <Box sx={{ 
            width: '100%', 
            maxWidth: '600px',
            position: 'relative',
            zIndex: 1
          }}>
            <Box sx={{
              p: 3,
              borderRadius: 4,
              background: step >= 4 ? 'linear-gradient(135deg, var(--success) 0%, var(--success) 100%)' : 'white',
              border: step >= 4 ? 'none' : '3px dashed var(--line-strong)',
              color: step >= 4 ? 'white' : 'var(--ink-soft)',
              transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transform: step >= 4 ? 'scale(1.02)' : 'scale(1)',
              boxShadow: step >= 4 ? '0 10px 30px rgba(15, 118, 110, 0.3)' : 'none',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: step >= 4 ? 'rgba(255,255,255,0.2)' : 'var(--paper-sunken)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}>
                  4
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  GET Request for Updated State
                </Typography>
              </Box>
              
              {step >= 4 && (
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 2,
                  animation: 'slideIn 0.4s ease-out'
                }}>
                  <Typography variant="caption" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', display: 'block', mb: 1, opacity: 0.9 }}>
                    GET /api/users/1
                  </Typography>
                  <Box sx={{ 
                    p: 1.5, 
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {`{\n  id: 1,\n  name: "${profile.name}",\n  bio: "${editedBio}"\n}`}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* Step 5: Redux Update */}
          <Box sx={{ 
            width: '100%', 
            maxWidth: '600px',
            position: 'relative',
            zIndex: 1
          }}>
            <Box sx={{
              p: 3,
              borderRadius: 4,
              background: step >= 5 ? 'linear-gradient(135deg, var(--info) 0%, var(--info) 100%)' : 'white',
              border: step >= 5 ? 'none' : '3px dashed var(--line-strong)',
              color: step >= 5 ? 'white' : 'var(--ink-soft)',
              transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transform: step >= 5 ? 'scale(1.02)' : 'scale(1)',
              boxShadow: step >= 5 ? '0 10px 30px rgba(30, 64, 175, 0.3)' : 'none',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: step >= 5 ? 'rgba(255,255,255,0.2)' : 'var(--paper-sunken)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}>
                  5
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Redux Store Updates
                </Typography>
              </Box>
              
              {step >= 5 && (
                <Box sx={{ 
                  mt: 2, 
                  p: 2, 
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 2,
                  animation: 'slideIn 0.4s ease-out'
                }}>
                  <Typography variant="caption" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', display: 'block', mb: 1, opacity: 0.9 }}>
                    dispatch(updateUser)
                  </Typography>
                  <Box sx={{ 
                    p: 1.5, 
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.7rem'
                  }}>
                    State updated ✓
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* Step 6: UI Re-renders */}
          <Box sx={{ 
            width: '100%', 
            maxWidth: '600px',
            position: 'relative',
            zIndex: 1
          }}>
            <Box sx={{
              p: 3,
              borderRadius: 4,
              background: step >= 6 ? 'linear-gradient(135deg, var(--info) 0%, var(--feature) 100%)' : 'white',
              border: step >= 6 ? 'none' : '3px dashed var(--line-strong)',
              color: step >= 6 ? 'white' : 'var(--ink-soft)',
              transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transform: step >= 6 ? 'scale(1.02)' : 'scale(1)',
              boxShadow: step >= 6 ? '0 10px 30px rgba(79, 70, 229, 0.3)' : 'none',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: step >= 6 ? 'rgba(255,255,255,0.2)' : 'var(--paper-sunken)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}>
                  6
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  React UI Re-renders
                </Typography>
              </Box>
              
              {step >= 6 && (
                <Box sx={{ 
                  mt: 2, 
                  p: 3, 
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 3,
                  animation: 'slideIn 0.4s ease-out'
                }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: 2,
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}>
                    <EditIcon sx={{ fontSize: 40, opacity: 0.9 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {profile.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.95 }}>
                        {step === 6 ? editedBio : profile.bio}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

        </Box>
      </Box>

      <style jsx global>{`
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