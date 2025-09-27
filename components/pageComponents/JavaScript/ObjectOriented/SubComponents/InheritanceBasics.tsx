import React from 'react';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import CalloutBox from '@/components/common/CalloutBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InheritanceBasics: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Inheritance</strong> lets you create new classes that automatically get all the properties and methods from a parent class. Instead of copying code, you extend existing classes and add only what's new.
      </p>

      <ConceptInfoCard>
        <h6 style={{ margin: '0 0 16px 0', color: '#333' }}>Understanding Inheritance</h6>
        
        <div style={{ marginBottom: 16 }}>
          <h5 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>Parent Class (Superclass)</h5>
          <p style={{ margin: '0 0 8px 0', lineHeight: 1.5 }}>The base class that defines common properties and methods that child classes inherit</p>
          <code style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: 4, fontSize: 14 }}>
            class Animal {`{ constructor(name) { this.name = name; } speak() { return 'makes a sound'; } }`}
          </code>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h5 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>Child Class (Subclass)</h5>
          <p style={{ margin: '0 0 8px 0', lineHeight: 1.5 }}>A class that extends a parent class, inheriting its features and adding its own</p>
          <code style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: 4, fontSize: 14 }}>
            class Dog extends Animal {`{ constructor(name, breed) { super(name); this.breed = breed; } }`}
          </code>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h5 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>super() Method</h5>
          <p style={{ margin: '0 0 8px 0', lineHeight: 1.5 }}>Used to call the parent class constructor and access parent class methods</p>
          <code style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: 4, fontSize: 14 }}>
            super(name); // calls parent constructor with name parameter
          </code>
        </div>

        <div>
          <h5 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>Method Override</h5>
          <p style={{ margin: '0 0 8px 0', lineHeight: 1.5 }}>Child classes can override parent methods to provide specialized behavior</p>
          <code style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: 4, fontSize: 14 }}>
            {`speak() { return \`\${this.name} barks!\`; } // overrides parent speak() method`}
          </code>
        </div>
      </ConceptInfoCard>

      <CalloutBox title="Key Inheritance Concepts" type="key-concepts">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>Less Code:</strong> Write common functionality once in the parent class</li>
          <li><strong>Easy Updates:</strong> Change parent class and all children get the updates</li>
          <li><strong>Natural Modeling:</strong> Represents real relationships (Vehicle → Car → Tesla)</li>
          <li><strong>Consistent Interface:</strong> All children share the same basic methods</li>
        </ul>
      </CalloutBox>
    </div>
  );
};

export default InheritanceBasics;
