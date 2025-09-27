import React from 'react';
import ConceptWrapper from '@/components/common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import XMLBasics from './SubComponents/XMLBasics';
import JSONBasics from './SubComponents/JSONBasics';
import XMLvsJSONComparison from './SubComponents/XMLvsJSONComparison';
import DataParsingExamples from './SubComponents/DataParsingExamples';

const DataFormatsConcept: React.FC = () => {
  return (
    <ConceptWrapper
      title="📊 Data Formats: XML & JSON"
      description="Understand the structure and usage of XML and JSON data formats in web development and API communication."
    >
      <TableOfContents>
        <Section title="XML Fundamentals">
          <XMLBasics />
        </Section>
        
        <Section title="JSON Fundamentals">
          <JSONBasics />
        </Section>
        
        <Section title="XML vs JSON">
          <XMLvsJSONComparison />
        </Section>
        
        <Section title="Parsing & Processing">
          <DataParsingExamples />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
};

export default DataFormatsConcept;