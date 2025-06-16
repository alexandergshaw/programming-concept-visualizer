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
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import JavaScriptIcon from '@mui/icons-material/Javascript';
import PythonIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';
import PhpIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import BugReportIcon from '@mui/icons-material/BugReport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython, faJs } from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap, faBug } from '@fortawesome/free-solid-svg-icons';

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

const AccentButton = styled(Button)(() => ({
  background: '#6366f1',
  color: 'white',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 500,
  padding: '12px 24px',
  boxShadow: 'none',
  '&:hover': {
    background: '#5855eb',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
  },
}));

const FilterChip = styled(Chip)(({ theme, selected }: { selected: boolean }) => ({
  background: selected ? '#6366f1' : 'transparent',
  color: selected ? 'white' : '#64748b',
  border: `1px solid ${selected ? '#6366f1' : '#e2e8f0'}`,
  borderRadius: '20px',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&:hover': {
    background: selected ? '#5855eb' : '#f8fafc',
    borderColor: selected ? '#5855eb' : '#cbd5e1',
  },
}));

const NetworkSection = styled(Box)(() => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  background: 'white',
  borderTop: '1px solid #f0f0f0',
}));

const VisualizationCard = styled(Paper)(() => ({
  background: 'white',
  border: '1px solid #f0f0f0',
  borderRadius: '16px',
  padding: '32px',
  boxShadow: 'none',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
  },
}));

const languages = [
  { name: 'Programming Basics', type: 'Fundamentals'},
  { name: 'JavaScript', type: 'Programming Language' },
  { name: 'Python', type: 'Programming Language' },
  { name: 'Software Testing', type: 'Quality Assurance'},
];

const typeFilters = ['Frontend', 'Backend', 'Database', 'Fundamentals', 'Quality Assurance'];

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSkills] = useState<string[]>([]);

  const toggleFilter = (filter: string, list: string[], setList: (val: string[]) => void) => {
    setList(list.includes(filter) ? list.filter((item) => item !== filter) : [...list, filter]);
  };

  const filteredLanguages = languages.filter((lang) => {
    const matchesSearch = lang.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(lang.type);
    const matchesSkill = selectedSkills.length === 0 || selectedSkills.includes(lang.skill);
    return matchesSearch && matchesType && matchesSkill;
  });

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

              <TextField
                variant="outlined"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  maxWidth: 400,
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e2e8f0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#6366f1',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6366f1',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Grid container spacing={3}>
              {filteredLanguages.map((lang) => (
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
        </Container>
      </HeroSection>
    </Box>
  );
}
