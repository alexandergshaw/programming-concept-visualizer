'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import GenericIntroduction from '../../common/GenericIntroduction';
import EthicalHackingConcept from './EthicalHackingConcept';
import HackingPhasesConcept from './HackingPhasesConcept';
import FootprintingConcept from './FootprintingConcept';
import ScanningConcept from './ScanningConcept';
import VulnerabilityAssessmentConcept from './VulnerabilityAssessmentConcept';
import SocialEngineeringConcept from './SocialEngineeringConcept';
import WebAttacksConcept from './WebAttacksConcept';
import AuthenticationSecurityConcept from './AuthenticationSecurityConcept';
import NetworksConcept from './NetworksConcept';
import SystemArchitectureConcept from './SystemArchitectureConcept';
import MalwareConcept from './MalwareConcept';
import WirelessSecurityConcept from './WirelessSecurityConcept';
import CryptographyConcept from './CryptographyConcept';
import WebSecurityConcept from './WebSecurityConcept';
import SecurityIcon from '@mui/icons-material/Security';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { cybersecurityNavItems as navItems } from '../navItems';

export default function CybersecurityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  useEffect(() => {
    const conceptFromUrl = searchParams.get('concept');
    if (conceptFromUrl) {
      setSelectedConcept(conceptFromUrl);
    }
  }, [searchParams]);

  const renderContent = (concept: string | null) => {
    if (!concept) return null;

    switch (concept.toLowerCase()) {
      case 'introduction':
        return (
          <GenericIntroduction
            title="Welcome to Cybersecurity"
            paragraphs={[
              "Cybersecurity is the practice of protecting computers, networks, and data from digital attacks. As more of life and business moves online, understanding how systems can be attacked — and how to defend them — has become an essential skill.",
              "This course builds from the ground up: how systems and networks are put together, the ways attackers gather information and exploit weaknesses, the threats to watch for like malware and weak authentication, and the defenses — from cryptography to secure design — that keep data safe. You'll learn to think like an attacker so you can protect like a professional.",
            ]}
            steps={[
              { icon: <SecurityIcon sx={{ fontSize: 48, color: 'var(--info)' }} />, label: 'Foundations & Ethics' },
              { icon: <AccountTreeIcon sx={{ fontSize: 48, color: 'var(--warning)' }} />, label: 'Systems & Networks' },
              { icon: <CoronavirusIcon sx={{ fontSize: 48, color: 'var(--danger)' }} />, label: 'Threats & Attacks' },
              { icon: <EnhancedEncryptionIcon sx={{ fontSize: 48, color: 'var(--success)' }} />, label: 'Protecting Data' },
            ]}
            closing="Whether you want to defend systems or simply understand the risks, these fundamentals are where every security professional begins. Let's get started!"
          />
        );
      case 'ethical-hacking':
        return <EthicalHackingConcept />;
      case 'hacking-phases':
        return <HackingPhasesConcept />;
      case 'footprinting':
        return <FootprintingConcept />;
      case 'scanning':
        return <ScanningConcept />;
      case 'vulnerability-assessment':
        return <VulnerabilityAssessmentConcept />;
      case 'social-engineering':
        return <SocialEngineeringConcept />;
      case 'web-attacks':
        return <WebAttacksConcept />;
      case 'authentication-security':
        return <AuthenticationSecurityConcept />;
      case 'networks':
        return <NetworksConcept />;
      case 'system-architecture':
        return <SystemArchitectureConcept />;
      case 'malware':
        return <MalwareConcept />;
      case 'wireless-security':
        return <WirelessSecurityConcept />;
      case 'cryptography':
        return <CryptographyConcept />;
      case 'web-security':
        return <WebSecurityConcept />;
      default:
        return null;
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/skills/cybersecurity?concept=${value}`);
    setSelectedConcept(value);
  };

  return (
    <PageWrapper
      pageTitle="Cybersecurity"
      navItems={navItems}
      defaultOpen={['foundations', 'attacks-and-techniques', 'systems-and-threats', 'protecting-data']}
      handleSelect={handleSelect}
      activeValue={selectedConcept || undefined}
    >
      {selectedConcept ? (
        <>
          {renderContent(selectedConcept)}
        </>
      ) : (
        <div className="empty-page-prompt">
          Please select a topic from the sidebar to get started.
        </div>
      )}
    </PageWrapper>
  );
}
