import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  keyframes
} from '@mui/material';
import {
  RecyclingOutlined,
  SmartToyOutlined,
  AnalyticsOutlined,
  PhoneAndroidOutlined,
  ErrorOutlined,
  CheckCircleOutlined,
  SensorsOutlined,
  AutoAwesomeOutlined,
  Compost
} from '@mui/icons-material';

const COLORS = {
  organic: '#00C49F',
  recyclable: '#0088FE',
  problem: '#f44336',
  success: '#4caf50'
};

// Define animations
const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-15px);
  }
  70% {
    transform: translateY(-7px);
  }
`;

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  type SectionKeys = 'hero' | 'problem' | 'solution' | 'features' | 'benefits' | 'cta';
  type SectionInView = Record<SectionKeys, boolean>;
  const [sectionInView, setSectionInView] = useState<SectionInView>({
    hero: false,
    problem: false,
    solution: false,
    features: false,
    benefits: false,
    cta: false
  });

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setSectionInView(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <SmartToyOutlined sx={{ fontSize: 40, color: COLORS.organic }} />,
      color: COLORS.organic,
      title: "AI-Powered Recognition",
      description: "Advanced machine learning identifies waste types with 95%+ accuracy using computer vision trained on thousands of images"
    },
    {
      icon: <AnalyticsOutlined sx={{ fontSize: 40, color: COLORS.recyclable }} />,
      color: COLORS.recyclable,
      title: "Real-time Analytics",
      description: "Track sorting performance, waste patterns, and environmental impact through intelligent data collection"
    },
    {
      icon: <PhoneAndroidOutlined sx={{ fontSize: 40, color: COLORS.organic }} />,
      color: COLORS.organic,
      title: "Smart Feedback System",
      description: "Interactive interface allows users to confirm classifications, continuously improving our AI model"
    }
  ];

  const benefits = [
    { text: "Effortless Recycling", icon: "♻️", color: COLORS.organic },
    { text: "Reduce Landfill Waste", icon: "🌱", color: COLORS.success },
    { text: "Cleaner Environment", icon: "🌍", color: COLORS.recyclable },
    { text: "Smart City Ready", icon: "🏙️", color: COLORS.organic }
  ];

  type WasteBinProps = {
    type: 'organic' | 'recyclable';
    color: string;
    label: string;
    size?: "large" | "small";
    showItems?: boolean;
    animateItems?: boolean;
  };

  const WasteBin: React.FC<WasteBinProps> = ({ type, color, label, size = "large", showItems = false, animateItems = false }) => {
    const isLarge = size === "large";
    const binWidth = isLarge ? 70 : 60;
    const binHeight = isLarge ? 90 : 80;

    return (
      <Box sx={{ position: 'relative' }}>
        {/* Bin Container */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: binWidth,
            height: binHeight,
            backgroundColor: color,
            borderRadius: '12px 12px 6px 6px',
          }}
        >
          {/* Lid */}
          <Box
            sx={{
              position: 'absolute',
              top: -6,
              left: -3,
              width: binWidth + 6,
              height: 10,
              backgroundColor: color,
              borderRadius: '6px',
              opacity: 0.8
            }}
          />

          {/* Label */}
          <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '1.125rem' }}>
            {label}
          </Typography>

          {/* Correct Icon for bin type */}
          <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
            {type === 'organic' ? (
              <Compost sx={{ fontSize: 16, color: 'white', opacity: 0.7 }} />
            ) : (
              <RecyclingOutlined sx={{ fontSize: 16, color: 'white', opacity: 0.7 }} />
            )}
          </Box>
        </Box>

        {/* Floating waste items */}
        {showItems && (
          <>
            <Box
              sx={{
                position: 'absolute',
                fontSize: '1.125rem',
                top: -15,
                left: type === 'organic' ? -20 : 80,
                animation: animateItems ? `${bounce} 2s infinite` : 'none',
                animationDelay: '0s'
              }}
            >
              {type === 'organic' ? '🍌' : '📱'}
            </Box>
            <Box
              sx={{
                position: 'absolute',
                fontSize: '0.875rem',
                top: -25,
                left: type === 'organic' ? -30 : 90,
                animation: animateItems ? `${bounce} 2s infinite` : 'none',
                animationDelay: '0.5s'
              }}
            >
              {type === 'organic' ? '🍎' : '🥤'}
            </Box>
          </>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Hero Section */}
      <Box id="hero" data-section component="section" sx={{ py: 18, px: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                transition: 'all 1s ease-out',
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                opacity: isVisible ? 1 : 0
              }}
            >
              {/* Smart Dustbin Illustration */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Paper
                  sx={{
                    position: 'relative',
                    p: 4,
                    borderRadius: 6,
                    background: `linear-gradient(135deg, ${COLORS.organic}15, ${COLORS.recyclable}15)`,
                    boxShadow: 3
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                    <WasteBin type="organic" color={COLORS.organic} label="O" showItems={true} animateItems={true} />
                    <WasteBin type="recyclable" color={COLORS.recyclable} label="R" showItems={true} animateItems={true} />
                  </Box>

                  {/* AI Sensor */}
                  <Paper
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%'
                    }}
                  >
                    <SensorsOutlined
                      sx={{
                        fontSize: 12,
                        color: '#0088FE',
                        animation: `${pulse} 2s infinite`
                      }}
                    />
                  </Paper>
                </Paper>
              </Box>

              <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4rem' }, fontWeight: 700, color: 'grey.900', mb: 2 }}>
                Smart Dustbin
              </Typography>
              <Typography variant="h5" sx={{ color: 'grey.600', maxWidth: '600px', mx: 'auto', fontWeight: 500, }}>
                Revolutionizing Waste Management with AI-Powered Automatic Segregation
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Problem Section */}
      <Box id="problem" data-section component="section" sx={{ py: 8, px: 2, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Box
            display='flex'
            alignItems="center"
            sx={{
              transition: 'all 1s ease-out',
              transform: sectionInView.problem ? 'translateY(0)' : 'translateY(32px)',
              opacity: sectionInView.problem ? 1 : 0
            }}
          >
            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <ErrorOutlined sx={{ fontSize: 32, color: COLORS.recyclable }} />
                <Typography variant="h3" sx={{ fontWeight: 700, color: COLORS.recyclable }}>
                  The Problem
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'grey.700', fontSize: '1.125rem', lineHeight: 1.6, mb: 3 }}>
                Improper waste segregation is a global crisis. Mixed waste contaminates recyclables,
                organic matter rots in landfills producing methane, and our environment suffers
                irreversible damage. Traditional bins rely on human discipline, which often fails.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>•</Typography>
                  <Typography sx={{ color: 'grey.600' }}>85% of waste is improperly sorted</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>•</Typography>
                  <Typography sx={{ color: 'grey.600' }}>Overflow of dustbin is also a major issue</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>•</Typography>
                  <Typography sx={{ color: 'grey.600' }}>Contaminated recyclables end up in landfills</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>•</Typography>
                  <Typography sx={{ color: 'grey.600' }}>Organic waste produces harmful greenhouse gases</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid sx={{ display: 'flex', justifyContent: 'center', width: '100%', alignSelf: 'flex-end' }}>
              <Box sx={{ position: 'relative' }}>
                {/* Mixed waste illustration */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 96,
                        bgcolor: 'grey.500',
                        borderRadius: '12px 12px 6px 6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography sx={{ color: 'white', fontWeight: 600 }}>?</Typography>
                    </Box>
                    {/* Mixed items floating around */}
                    <Box sx={{ position: 'absolute', top: -24, right: -16, fontSize: '1.25rem', animation: `${pulse} 2s infinite` }}>🍌</Box>
                    <Box sx={{ position: 'absolute', top: -32, left: -16, fontSize: '1.125rem', animation: `${pulse} 2s infinite` }}>📱</Box>
                    <Box sx={{ position: 'absolute', bottom: -8, right: -24, fontSize: '0.875rem', animation: `${pulse} 2s infinite` }}>🥤</Box>
                  </Box>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 96,
                        bgcolor: 'grey.500',
                        borderRadius: '12px 12px 6px 6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography sx={{ color: 'white', fontWeight: 600 }}>?</Typography>
                    </Box>
                    <Box sx={{ position: 'absolute', top: -24, right: -16, fontSize: '1.25rem', animation: `${pulse} 2s infinite` }}>🍎</Box>
                    <Box sx={{ position: 'absolute', top: -32, left: -16, fontSize: '1.125rem', animation: `${pulse} 2s infinite` }}>📄</Box>
                  </Box>
                </Box>
                <Typography sx={{ textAlign: 'center', mt: 2, color: 'primary.main', fontWeight: 600 }}>
                  Mixed Waste Crisis
                </Typography>
              </Box>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Solution Section */}
      <Box
        id="solution"
        data-section
        component="section"
        sx={{
          py: 8,
          px: 2,
          background: 'linear-gradient(to right, #f0f9ff, #ecfdf5)'
        }}
      >
        <Container maxWidth="lg">
          <Box
            display='flex'
            alignItems="center"
            sx={{
              transition: 'all 1s ease-out',
              transform: sectionInView.solution ? 'translateY(0)' : 'translateY(32px)',
              opacity: sectionInView.solution ? 1 : 0
            }}
          >
            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <CheckCircleOutlined sx={{ fontSize: 32, color: '#4caf50' }} />
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'green' }}>
                  Our Smart Solution
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'grey.700', fontSize: '1.125rem', lineHeight: 1.6, mb: 3 }}>
                Our AI-powered Smart Dustbin automatically identifies and segregates waste into
                Organic and Recyclable compartments using advanced computer vision and machine
                learning trained on over 60,000 waste images.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography sx={{ color: 'green', fontWeight: 'bold' }}>✓</Typography>
                  <Typography sx={{ color: 'grey.700' }}>Instant waste recognition and sorting</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography sx={{ color: 'green', fontWeight: 'bold' }}>✓</Typography>
                  <Typography sx={{ color: 'grey.700' }}>95%+ accuracy rate with continuous learning</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography sx={{ color: 'green', fontWeight: 'bold' }}>✓</Typography>
                  <Typography sx={{ color: 'grey.700' }}>User feedback system for model improvement</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', width: '100%', alignSelf: 'flex-end' }}>
              <Box sx={{ position: 'relative' }}>
                {/* Smart sorting illustration */}
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <WasteBin type="organic" color={COLORS.organic} label="O" size="large" />
                  <WasteBin type="recyclable" color={COLORS.recyclable} label="R" size="large" />
                </Box>

                {/* Smart indicators */}
                <Paper
                  sx={{
                    position: 'absolute',
                    top: -32,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderRadius: '50%',
                    p: 1
                  }}
                >
                  <AutoAwesomeOutlined sx={{ fontSize: 24, color: '#0088FE' }} />
                </Paper>

                {/* Sorting arrows */}
                <Box sx={{ position: 'absolute', top: 16, left: 32 }}>
                  <Typography sx={{ color: 'green', fontSize: '1.125rem', animation: `${bounce} 2s infinite` }}>↙️</Typography>
                </Box>
                <Box sx={{ position: 'absolute', top: 16, right: 32 }}>
                  <Typography sx={{ color: 'blue', fontSize: '1.125rem', animation: `${bounce} 2s infinite` }}>↘️</Typography>
                </Box>

                <Typography sx={{ textAlign: 'center', mt: 2, color: 'green', fontWeight: 600 }}>
                  Perfect Segregation
                </Typography>
              </Box>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" data-section component="section" sx={{ py: 8, px: 2, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              transition: 'all 1s ease-out',
              transform: sectionInView.features ? 'translateY(0)' : 'translateY(32px)',
              opacity: sectionInView.features ? 1 : 0
            }}
          >
            <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 700, color: 'grey.900', mb: 6 }}>
              Key Features
            </Typography>
            <Box sx={{ display: 'grid', gridAutoFlow: 'column', gap: 4 }}>
              {features.map((feature, index) => (
                <Grid key={index}>
                  <Box
                    sx={{
                      p: 4,
                      height: '260px',
                      textAlign: 'center',
                      borderRadius: 4,
                      border: '1px solid',
                      backgroundColor: `${feature.color}15`,
                      borderColor: 'grey.100',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        '& .feature-icon': {
                          transform: 'scale(1.1)'
                        }
                      }
                    }}
                  >
                    <Box
                      className="feature-icon"
                      sx={{
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'grey.900', mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: 'grey.600', lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box id="benefits" data-section component="section" sx={{ py: 8, px: 2, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              transition: 'all 1s ease-out',
              transform: sectionInView.benefits ? 'translateY(0)' : 'translateY(32px)',
              opacity: sectionInView.benefits ? 1 : 0
            }}
          >
            <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 700, color: 'grey.900', mb: 6 }}>
              Environmental Impact
            </Typography>
            <Grid container justifyContent='center' spacing={3}>
              {benefits.map((benefit, index) => (
                <Grid key={index}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 5,
                      borderRadius: 3,
                      backgroundColor: `${benefit.color}15`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '2rem',
                        mb: 2,
                        animation: `${pulse} 2s infinite`
                      }}
                    >
                      {benefit.icon}
                    </Typography>
                    <Typography sx={{ fontWeight: 600, color: 'grey.800' }}>
                      {benefit.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box id="cta" data-section component="section" sx={{ py: 10, px: 2 }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              textAlign: 'center',
              p: 6,
              borderRadius: 6,
              color: 'white',
              background: `linear-gradient(135deg, ${COLORS.organic}90, ${COLORS.recyclable}90)`,
              boxShadow: 8,
              transition: 'all 1s ease-out',
              transform: sectionInView.cta ? 'translateY(0)' : 'translateY(32px)',
              opacity: sectionInView.cta ? 1 : 0
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
              Join the Waste Revolution
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
              Every piece of properly sorted waste is a step toward a cleaner planet.
              Be part of the solution that makes sustainability effortless and automatic.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', mb: 6 }}>
              <Button
                variant='text'
                sx={{
                  px: 4,
                  py: 2,
                  bgcolor: 'white',
                  color: `${COLORS.organic}`,
                  fontWeight: 700,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                Get Started Today
              </Button>
              <Button
                variant="outlined"
                sx={{
                  px: 4,
                  py: 2,
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 700,
                  borderRadius: 3,
                  borderWidth: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'white',
                    color: 'green',
                    borderColor: 'white'
                  }
                }}
              >
                Learn More
              </Button>
            </Box>

            {/* Statistics */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 4,
                pt: 4,
                borderTop: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>95%</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Accuracy Rate</Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>60K+</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Training Images</Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>24/7</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Smart Operation</Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}