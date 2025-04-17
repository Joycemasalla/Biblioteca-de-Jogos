import styled from 'styled-components';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Container principal do Footer
const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.footerBackground || '#111'};
  color: ${({ theme }) => theme.text};
  padding: 40px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid ${({ theme }) => theme.accent};
  margin-top: 40px;
  z-index: 201;
`;

const FooterTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin-bottom: 30px;
`;

// Logo do site
const LogoSection = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};

  svg {
    margin-right: 8px;
  }
`;

// Secção de Integrantes com links
const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeamTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const TeamMember = styled.a`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  margin-bottom: 6px;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

// Redes sociais
const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.accent};
    transform: scale(1.1);
  }
`;

// Copy centralizado
const FooterCopy = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  text-align: center;
  width: 100%;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <LogoSection>
          🎮 PlayHub
        </LogoSection>

        <TeamSection>
          <TeamTitle>Equipe</TeamTitle>
          <TeamMember href="https://github.com" target="_blank">Gustavo Monteiro</TeamMember>
          <TeamMember href="https://github.com" target="_blank">Joyce Masalla</TeamMember>
          <TeamMember href="https://github.com" target="_blank">Júlia Ávila</TeamMember>
          <TeamMember href="https://github.com" target="_blank">Maria Eduarda</TeamMember>
          <TeamMember href="https://github.com" target="_blank">Sânio Trindade</TeamMember>
        </TeamSection>

        <SocialLinks>
          <SocialLink href="https://github.com" target="_blank" aria-label="GitHub">
            <Github />
          </SocialLink>
          <SocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
            <Linkedin />
          </SocialLink>
          <SocialLink href="https://instagram.com" target="_blank" aria-label="Instagram">
            <Instagram />
          </SocialLink>
        </SocialLinks>
      </FooterTop>

      <FooterCopy>&copy; 2025 PlayHub. Todos os direitos reservados.</FooterCopy>
    </FooterContainer>
  );
};
