import { generateObjectPreviewLines } from "../../../../components/concepts/ObjectConcept";

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

