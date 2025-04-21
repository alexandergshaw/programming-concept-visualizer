import ObjectConcept, { generateObjectPreviewLines } from "../../../../components/languages/JavaScript/ObjectConcept";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Helper: adds a new key-value pair
const addObjectEntry = (label: string, value: string) => {
  const keyInput = screen.getAllByLabelText('Key')[0];
  const valueInput = screen.getAllByLabelText('Value (JS Expression)')[0];
  fireEvent.change(keyInput, { target: { value: label } });
  fireEvent.change(valueInput, { target: { value } });
};

describe('ObjectConcept component', () => {
  it('renders all definitions', () => {
    render(<ObjectConcept />);
    expect(screen.getByText('An object is a key-value pair structure that stores data. Keys are called properties.')).toBeInTheDocument();
    expect(screen.getByText('We can access the values corresponding to keys with dot notation. An example of this is below.')).toBeInTheDocument();
    expect(screen.getByText('Destructuring is a JavaScript feature that lets us extract values from an object (or array) and assign them to variables.')).toBeInTheDocument();
  });

  it('updates the preview section with entered properties', () => {
    render(<ObjectConcept />);
    addObjectEntry('age', '27');
    expect(screen.getAllByText(/age: 27/)).toBeTruthy();
  });

  it('includes all keys and values in access and destructure sections', () => {
    render(<ObjectConcept />);
    addObjectEntry('color', '"blue"');

    const accessLines = screen.getByText(/console\.log\(obj\.color\)/);
    const destructureLines = screen.getByText(/console\.log\(color\)/);

    expect(accessLines).toBeInTheDocument();
    expect(destructureLines).toBeInTheDocument();
  });

  it('adds a new property when "Add Property" is clicked', () => {
    render(<ObjectConcept />);
    const addButton = screen.getByRole('button', { name: 'Add Property' });
    fireEvent.click(addButton);

    const inputs = screen.getAllByLabelText('Key');
    expect(inputs.length).toBeGreaterThan(1);
  });

  it('shows error message for invalid JS input', () => {
    render(<ObjectConcept />);
    const keyInput = screen.getAllByLabelText('Key')[0];
    const valueInput = screen.getAllByLabelText('Value (JS Expression)')[0];
    fireEvent.change(keyInput, { target: { value: 'bad' } });
    fireEvent.change(valueInput, { target: { value: 'not-valid-js' } });

    expect(screen.getByText(/Live object update failed/)).toBeInTheDocument();
  });
});


describe('generateObjectPreviewLines', () => {
  const testObject = {
    name: 'Alex',
    age: 30,
    greet: () => 'Hi!',
  };

  it('includes all keys and values in preview mode', () => {
    const lines = generateObjectPreviewLines(testObject, 'preview');

    expect(lines).toEqual(
      expect.arrayContaining([
        expect.stringContaining('name'),
        expect.stringContaining('"Alex"'),
        expect.stringContaining('age'),
        expect.stringContaining('30'),
        expect.stringContaining('greet'),
        expect.stringContaining('[Function]'),
      ])
    );
  });

  it('includes all keys and values in access mode', () => {
    const lines = generateObjectPreviewLines(testObject, 'access');

    expect(lines).toEqual(
      expect.arrayContaining([
        expect.stringContaining('name'),
        expect.stringContaining('"Alex"'),
        expect.stringContaining('age'),
        expect.stringContaining('30'),
        expect.stringContaining('greet'),
        expect.stringContaining('[Function]'),

        expect.stringContaining('obj.name'),
        expect.stringContaining('obj.age'),
        expect.stringContaining('obj.greet()'),
      ])
    );
  });

  it('includes all keys and values in destructure mode', () => {
    const lines = generateObjectPreviewLines(testObject, 'destructure');

    expect(lines).toEqual(
      expect.arrayContaining([
        expect.stringContaining('name'),
        expect.stringContaining('"Alex"'),
        expect.stringContaining('age'),
        expect.stringContaining('30'),
        expect.stringContaining('greet'),
        expect.stringContaining('[Function]'),

        expect.stringContaining('const { name, age, greet } = obj'),
        expect.stringContaining('console.log(name)'),
        expect.stringContaining('console.log(age)'),
        expect.stringContaining('console.log(greet)'),
      ])
    );
  });

  it('returns default message for empty object', () => {
    const lines = generateObjectPreviewLines({}, 'preview');
    expect(lines).toEqual(['// No object defined.']);
  });

  it('includes definition and usage comments in access mode', () => {
    const lines = generateObjectPreviewLines(testObject, 'access');
    expect(lines).toContain('// Create an object using key-value pairs');
    expect(lines).toContain('const obj = {');
    expect(lines).toContain('// Access and use the properties of the object using dot notation');
    expect(lines.some(line => line.includes('console.log(obj.name)'))).toBe(true);
    expect(lines.some(line => line.includes('console.log(obj.age)'))).toBe(true);
    expect(lines.some(line => line.includes('console.log(obj.greet())'))).toBe(true);
    expect(lines.some(line => line.includes("// the key is name"))).toBe(true);
  });

  it('includes destructuring comments and syntax in destructure mode', () => {
    const lines = generateObjectPreviewLines(testObject, 'destructure');
    expect(lines).toContain('// Declare an object with the following properties');
    expect(lines).toContain('// Destructure values from the object');
    expect(lines).toContain('// Log each destructured variable');
    expect(lines.some(line => line.includes('const { name, age, greet } = obj'))).toBe(true);
    expect(lines.some(line => line.includes('console.log(name)'))).toBe(true);
    expect(lines.some(line => line.includes('console.log(greet)'))).toBe(true);
  });

  it('returns fallback comment if object is empty', () => {
    const result = generateObjectPreviewLines({}, 'preview');
    expect(result).toEqual(['// No object defined.']);
  });
});

