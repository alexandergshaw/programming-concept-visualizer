'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import GenericIntroduction from '../../common/GenericIntroduction';
import CoreEthicalHackingConcept from './CoreEthicalHackingConcept';
import HackerTypesConcept from './HackerTypesConcept';
import SecurityMindsetConcept from './SecurityMindsetConcept';
import ProfessionalEthicsConcept from './ProfessionalEthicsConcept';
import LegalFrameworksConcept from './LegalFrameworksConcept';
import EthicalHackingConcept from './EthicalHackingConcept';
import HackingPhasesConcept from './HackingPhasesConcept';
import KernelUserSpaceConcept from './KernelUserSpaceConcept';
import SystemCallsConcept from './SystemCallsConcept';
import InterruptHandlingConcept from './InterruptHandlingConcept';
import ProcessSchedulingConcept from './ProcessSchedulingConcept';
import FootprintingConcept from './FootprintingConcept';
import OSINTConcept from './OSINTConcept';
import PassiveReconConcept from './PassiveReconConcept';
import SocialEngineeringReconConcept from './SocialEngineeringReconConcept';
import ActiveReconConcept from './ActiveReconConcept';
import NetworkScanningIntroConcept from './NetworkScanningIntroConcept';
import ARPScanningConcept from './ARPScanningConcept';
import ICMPScanningConcept from './ICMPScanningConcept';
import LiveHostsConcept from './LiveHostsConcept';
import OpenServicesConcept from './OpenServicesConcept';
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
      case 'core-ethical-hacking':
        return <CoreEthicalHackingConcept />;
      case 'hacker-types':
        return <HackerTypesConcept />;
      case 'security-mindset':
        return <SecurityMindsetConcept />;
      case 'professional-ethics':
        return <ProfessionalEthicsConcept />;
      case 'legal-frameworks':
        return <LegalFrameworksConcept />;
      case 'ethical-hacking':
        return <EthicalHackingConcept />;
      case 'hacking-phases':
        return <HackingPhasesConcept />;
      case 'system-architecture':
        return <SystemArchitectureConcept />;
      case 'kernel-user-space':
        return <KernelUserSpaceConcept />;
      case 'system-calls':
        return <SystemCallsConcept />;
      case 'interrupt-handling':
        return <InterruptHandlingConcept />;
      case 'process-scheduling':
        return <ProcessSchedulingConcept />;
      case 'footprinting':
        return <FootprintingConcept />;
      case 'osint':
        return <OSINTConcept />;
      case 'passive-recon':
        return <PassiveReconConcept />;
      case 'social-engineering-recon':
        return <SocialEngineeringReconConcept />;
      case 'active-recon':
        return <ActiveReconConcept />;
      case 'network-scanning-intro':
        return <NetworkScanningIntroConcept />;
      case 'arp-scanning':
        return <ARPScanningConcept />;
      case 'icmp-scanning':
        return <ICMPScanningConcept />;
      case 'live-hosts':
        return <LiveHostsConcept />;
      case 'open-services':
        return <OpenServicesConcept />;
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
      defaultOpen={[
        'intro-ethical-hacking',
        'system-architecture-os',
        'recon-footprinting',
        'network-scanning',
        'attacks-and-techniques',
        'systems-and-threats',
        'protecting-data',
      ]}
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

