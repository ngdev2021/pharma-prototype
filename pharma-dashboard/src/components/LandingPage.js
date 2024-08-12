import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import {
  FaCheck,
  FaArrowRight,
  FaPlay,
  FaRegLightbulb,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';

// Styled Components
const HeroSection = styled(Parallax)`
  color: #fff;
  padding: 140px 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);

  h1 {
    font-size: 4.5rem;
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }

  p {
    font-size: 1.8rem;
    margin-bottom: 50px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  }
`;

const FeatureSection = styled.section`
  padding: 100px 0;
  background: #f9f9f9;
  text-align: center;
`;

const FeatureCard = styled(motion.div)`
  background: #fff;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }

  h3 {
    margin-top: 20px;
    font-weight: 700;
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-top: 15px;
  }
`;

const FeatureIcon = styled.div`
  font-size: 4rem;
  color: #007bff;
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, #007bff, #00d2ff);
  color: #fff;
  padding: 120px 0;
  text-align: center;
  position: relative;
`;

const CTAButton = styled(Button)`
  padding: 18px 50px;
  font-size: 1.7rem;
  font-weight: 700;
  border-radius: 50px;
  background: #ff5733;
  border: none;
  box-shadow: 0 12px 18px rgba(0, 0, 0, 0.3);

  &:hover {
    background: #ff7f50;
  }
`;

const VideoSection = styled.section`
  background: #1c1f24;
  color: #fff;
  padding: 100px 0;
  text-align: center;
`;

const VideoButton = styled(Button)`
  padding: 12px 28px;
  font-size: 1.4rem;
  background: transparent;
  border: 3px solid #fff;
  color: #fff;
  border-radius: 50px;
  margin-top: 25px;

  &:hover {
    background: #fff;
    color: #007bff;
  }
`;

const TestimonialSection = styled.section`
  padding: 100px 0;
  background: #f8f9fa;
`;

const TestimonialCard = styled(motion.div)`
  background: #ffffff;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  text-align: left;

  p {
    font-size: 1.1rem;
    color: #333;
  }

  h4 {
    margin-top: 20px;
    font-weight: bold;
    font-size: 1.3rem;
    color: #007bff;
  }
`;

const FooterSection = styled.footer`
  background: #282c34;
  color: #fff;
  padding: 70px 0;
  text-align: center;

  a {
    color: #fff;
    margin: 0 15px;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #00d2ff;
    }
  }
`;

const ParallaxLayer = styled.div`
  position: relative;
  z-index: 1;
`;

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        bgImage="/path-to-your-hero-image.jpg"
        strength={300}
      >
        <ParallaxLayer>
          <Container>
            <h1>PharmaConnect</h1>
            <p>
              Your Complete Solution for Pharmaceutical Supply Chain
              Management
            </p>
            <Button variant="primary" size="lg">
              Get Started <FaArrowRight />
            </Button>
          </Container>
        </ParallaxLayer>
      </HeroSection>

      {/* Feature Section */}
      <FeatureSection>
        <Container>
          <Row className="text-center">
            <Col md={4}>
              <FeatureCard whileHover={{ scale: 1.1 }}>
                <FeatureIcon>
                  <FaCheck />
                </FeatureIcon>
                <h3>Real-Time Inventory</h3>
                <p>
                  Manage and monitor your inventory with ease and
                  precision.
                </p>
              </FeatureCard>
            </Col>
            <Col md={4}>
              <FeatureCard whileHover={{ scale: 1.1 }}>
                <FeatureIcon>
                  <FaCheck />
                </FeatureIcon>
                <h3>Order Tracking</h3>
                <p>
                  Stay updated on every order from start to finish.
                </p>
              </FeatureCard>
            </Col>
            <Col md={4}>
              <FeatureCard whileHover={{ scale: 1.1 }}>
                <FeatureIcon>
                  <FaCheck />
                </FeatureIcon>
                <h3>Supplier Management</h3>
                <p>
                  Keep all supplier relationships organized and
                  efficient.
                </p>
              </FeatureCard>
            </Col>
          </Row>
        </Container>
      </FeatureSection>

      {/* Call-to-Action Section */}
      <CTASection>
        <Container>
          <h2>
            Empower Your Pharmaceutical Operations with PharmaConnect
          </h2>
          <p>
            Join the growing community of professionals optimizing
            their supply chains with PharmaConnect.
          </p>
          <CTAButton>
            Sign Up Now <FaArrowRight />
          </CTAButton>
        </Container>
      </CTASection>

      {/* Video Section */}
      <VideoSection>
        <Container>
          <h2>See PharmaConnect in Action</h2>
          <p>
            Watch our demo to discover how PharmaConnect can transform
            your supply chain management.
          </p>
          <VideoButton>
            <FaPlay /> Watch Demo
          </VideoButton>
        </Container>
      </VideoSection>

      {/* Testimonials Section */}
      <TestimonialSection>
        <Container>
          <Row className="justify-content-center">
            <Col md={4}>
              <TestimonialCard whileHover={{ scale: 1.05 }}>
                <p>
                  "PharmaConnect has dramatically improved our
                  inventory accuracy and order tracking. A must-have
                  tool!"
                </p>
                <h4>John Doe, CEO of MedCorp</h4>
              </TestimonialCard>
            </Col>
            <Col md={4}>
              <TestimonialCard whileHover={{ scale: 1.05 }}>
                <p>
                  "Efficient, reliable, and easy to use. PharmaConnect
                  has been a game-changer for our operations."
                </p>
                <h4>Jane Smith, Head of Procurement</h4>
              </TestimonialCard>
            </Col>
            <Col md={4}>
              <TestimonialCard whileHover={{ scale: 1.05 }}>
                <p>
                  "We've seen significant improvements in our supplier
                  management and order fulfillment processes."
                </p>
                <h4>Emily Brown, Operations Manager</h4>
              </TestimonialCard>
            </Col>
          </Row>
        </Container>
      </TestimonialSection>

      {/* Footer Section */}
      <FooterSection>
        <Container>
          <p>&copy; 2024 PharmaConnect. All rights reserved.</p>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </Container>
      </FooterSection>
    </div>
  );
};

export default LandingPage;
