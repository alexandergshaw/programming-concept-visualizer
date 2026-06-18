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
import WifiIcon from '@mui/icons-material/Wifi';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

const navItems = [
  {
    label: 'Foundations',
    value: 'foundations',
    children: [
      { label: 'Introduction', value: 'introduction' },
      { label: 'What is Ethical Hacking?', value: 'ethical-hacking' },
      { label: 'Phases of a Hack', value: 'hacking-phases' },
    ],
  },
  {
    label: 'Attacks & Techniques',
    value: 'attacks-and-techniques',
    children: [
      { label: 'Footprinting & Recon', value: 'footprinting' },
      { label: 'Scanning & Enumeration', value: 'scanning' },
      { label: 'Vulnerability Assessment', value: 'vulnerability-assessment' },
      { label: 'Social Engineering', value: 'social-engineering' },
      { label: 'Web App Attacks', value: 'web-attacks' },
      { label: 'Authentication Security', value: 'authentication-security' },
    ],
  },
  {
    label: 'Systems & Threats',
    value: 'systems-and-threats',
    children: [
      { label: 'Networks & Communication', value: 'networks' },
      { label: 'System Architecture', value: 'system-architecture' },
      { label: 'Malware', value: 'malware' },
      { label: 'Wireless Security', value: 'wireless-security' },
    ],
  },
  {
    label: 'Protecting Data',
    value: 'protecting-data',
    children: [
      { label: 'Cryptography', value: 'cryptography' },
      { label: 'Cryptography on the Web', value: 'web-security' },
    ],
  },
];

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
            title="Welcome to Ethical Hacking"
            paragraphs={[
              "Ethical hacking is the practice of breaking into systems with permission, so that their weaknesses can be found and fixed before a real attacker exploits them. To defend a system well, you first have to understand how it can be attacked.",
              "In this course you'll learn the ethics and ground rules of hacking, the way attacks unfold, and the major areas an attacker probes — malware, system architecture, wireless networks, and cryptography. The goal throughout is to turn that knowledge into a stronger defense for a company.",
            ]}
            steps={[
              { icon: <SecurityIcon sx={{ fontSize: 48, color: 'var(--info)' }} />, label: 'Ethics & Fundamentals' },
              { icon: <AccountTreeIcon sx={{ fontSize: 48, color: 'var(--warning)' }} />, label: 'Systems & Threats' },
              { icon: <EnhancedEncryptionIcon sx={{ fontSize: 48, color: 'var(--success)' }} />, label: 'Protecting Data' },
            ]}
            closing="Used responsibly, these skills make systems safer for everyone. Let's get started!"
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
