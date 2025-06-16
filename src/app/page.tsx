'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Chip,
  Grid,
  Paper,
  Container,
  Button,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import JavaScriptIcon from '@mui/icons-material/Javascript';
import PythonIcon from '@mui/icons-material/Code';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython, faJs } from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap, faBug } from '@fortawesome/free-solid-svg-icons';
import CodeIcon from '@mui/icons-material/Code';

// Minimal styled components
const HeroSection = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  background: '#fafafa',
  position: 'relative',
  paddingTop: '2rem',
  paddingBottom: '2rem',
}));

const MinimalCard = styled(Card)(() => ({
  background: 'white',
  border: '1px solid #f0f0f0',
  borderRadius: '12px',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#6366f1',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

const languages = [
  { name: 'Programming Basics', type: 'Fundamentals'},
  { name: 'JavaScript', type: 'Programming Language' },
  { name: 'Python', type: 'Programming Language' },
  { name: 'Software Testing', type: 'Quality Assurance'},
];

// Function to get language icon
const getLanguageIcon = (language: string) => {
  const iconProps = { sx: { fontSize: 32, mb: 1 } };
  
  switch (language.toLowerCase()) {
    case 'javascript':
      return (
        <Box sx={{ fontSize: 32, mb: 1, color: '#F7DF1E' }}>
          <FontAwesomeIcon icon={faJs} />
        </Box>
      );
    case 'python':
      return (
        <Box sx={{ fontSize: 32, mb: 1, color: '#3776AB' }}>
          <FontAwesomeIcon icon={faPython} />
        </Box>
      );
    case 'programming basics':
      return (
        <Box sx={{ fontSize: 32, mb: 1, color: '#10b981' }}>
          <FontAwesomeIcon icon={faGraduationCap} />
        </Box>
      );
    case 'software testing':
      return (
        <Box sx={{ fontSize: 32, mb: 1, color: '#f59e0b' }}>
          <FontAwesomeIcon icon={faBug} />
        </Box>
      );
    default:
      return <CodeIcon {...iconProps} sx={{ ...iconProps.sx, color: '#6366f1' }} />;
  }
};

export default function LandingPage() {
  const router = useRouter();
  const [selectedSkills] = useState<string[]>([]);

  const handleClick = (language: string) => {
    switch (language.toLowerCase()) {
      case 'programming basics':
        router.push('/skills/programming-basics');
        break;
      case 'software testing':
        router.push('/skills/software-testing');
        break;
      default:
        router.push(`/languages/${language.toLowerCase()}`);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 2 }}>
                <CodeIcon sx={{ fontSize: 40, color: '#6366f1', mb: 2 }} />
              </Box>
              
              <Typography 
                variant="h2" 
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: '#1e293b',
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1,
                }}
              >
                Programming Concept
                <Box component="span" sx={{ color: '#6366f1', display: 'block' }}>
                  Visualizer
                </Box>
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{
                  color: '#64748b',
                  mb: 4,
                  fontWeight: 400,
                  fontSize: '1.25rem',
                  lineHeight: 1.6,
                }}
              >
                Learn programming concepts with visual examples and interactive tutorials
              </Typography>
              <Grid container spacing={3}>
              {languages.map((lang) => (
                <Grid item xs={6} sm={6} md={3} key={lang.name}>
                  <MinimalCard onClick={() => handleClick(lang.name)}>
                    <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
                      {getLanguageIcon(lang.name)}
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          mb: 1,
                          color: '#1e293b',
                          fontSize: '1.1rem',
                        }}
                      >
                        {lang.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#64748b',
                          mb: 2,
                          fontSize: '0.9rem',
                        }}
                      >
                        {lang.type}
                      </Typography>
                    </CardContent>
                  </MinimalCard>
                </Grid>
              ))}
            </Grid>
            </Grid>
            
          </Grid>
          
          {/* Footer */}
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid #e2e8f0' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#64748b',
                textAlign: 'center',
                fontSize: '0.9rem',
              }}
            >
              Maintained by Alex Shaw • Have suggestions? <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSf73dDuwy0mZUuApiG2kEGlcCp93pN-l1eOtFOTBA2BTf0Bqw/viewform?usp=sharing" 
                target="_blank"
                style={{ 
                  color: '#6366f1', 
                  textDecoration: 'none',
                  fontWeight: 500 
                }}
              >
                Submit feedback
              </a>
            </Typography>
          </Box>
        </Container>
      </HeroSection>
    </Box>
  );
}
