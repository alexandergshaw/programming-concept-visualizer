'use client';

import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faPython, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap, faBug, faCode, faGlobe, faDatabase, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import CodeIcon from '@mui/icons-material/Code';
import React, { useState, useEffect } from "react";
import Loader from '@/components/common/Loader';

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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '180px', // Ensures all cards have the same height
  minWidth: 0,
  width: '100%',
  '&:hover': {
    borderColor: '#00319b',
    boxShadow: '0 4px 12px rgba(0, 49, 155, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

const languages = [
  { name: 'Programming Basics', type: 'Fundamentals' },
  { name: 'Python', type: 'Programming Language' },
  { name: 'Software Testing', type: 'Topic' },
  { name: 'Databases', type: 'Topic' },        // Added
  { name: 'Cybersecurity', type: 'Topic' },           // Added
  { name: 'JavaScript', type: 'Programming Language' },
  // { name: 'GitHub', type: 'Tutorial' },
  // { name: 'Deploying a Website', type: 'Tutorial' },

];

// Function to get language icon
const getLanguageIcon = (language: string) => {
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
    case 'github':
      return (
        <Box sx={{ fontSize: 32, mb: 1, color: '#24292e' }}>
          <FontAwesomeIcon icon={faGithub} />
        </Box>
      );
    case 'deploying a website':
      return (
        <Box sx={{ fontSize: 32, mb: 1, color: '#0ea5e9' }}>
          <FontAwesomeIcon icon={faGlobe} />
        </Box>
      );
    case 'databases':
      return (
        <Box sx={{ fontSize: 32, mb: 1, color: '#6366f1' }}>
          <FontAwesomeIcon icon={faDatabase} />
        </Box>
      );
    case 'cybersecurity':
      return (
        <Box sx={{ fontSize: 32, mb: 1, color: '#16a34a' }}>
          <FontAwesomeIcon icon={faShieldHalved} />
        </Box>
      );
    default:
      return <FontAwesomeIcon icon={faCode} style={{ fontSize: 32, color: '#00319b' }} />;
  }
};

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching data)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (language: string) => {
    switch (language.toLowerCase()) {
      case 'programming basics':
        router.push('/skills/programming-basics');
        break;
      case 'software testing':
        router.push('/skills/software-testing');
        break;
      case 'github':
        router.push('/skills/github');
        break;
      case 'deploying a website':
        router.push('/skills/deploying-a-website');
        break;
      case 'databases':
        router.push('/skills/databases');
        break;
      case 'cybersecurity':
        router.push('/skills/cybersecurity');
        break;
      default:
        router.push(`/languages/${language.toLowerCase()}`);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Box>
            <Box sx={{ mb: 2 }}>
              <CodeIcon sx={{ fontSize: 40, color: '#00319b', mb: 2 }} />
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
              <Box component="span" sx={{ color: '#00319b', display: 'block' }}>
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

            <Typography variant="body1" sx={{ mb: 3 }}>
              This project is developed and maintained by one person (Alex) as I cover them in my classes. Thank you for your patience as the site grows!
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                mt: 2
              }}
            >
              {languages.map((lang) => (
                <Box
                  key={lang.name}
                  sx={{
                    flex: { xs: '0 0 calc(50% - 12px)', sm: '0 0 calc(50% - 12px)', md: '0 0 calc(25% - 18px)' }
                  }}
                >
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
                </Box>
              ))}
            </Box>
          </Box>

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
                className="slide-underline-link"
                style={{
                  color: '#00319b',
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
