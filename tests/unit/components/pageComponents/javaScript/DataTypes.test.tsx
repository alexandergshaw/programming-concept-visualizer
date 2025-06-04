import DataTypesConcept from '@/components/pageComponents/JavaScript/DataTypesConcept';
import { render, screen, fireEvent } from '@testing-library/react';

describe('DataTypesConcept', () => {
    it('renders the main title', () => {
        render(<DataTypesConcept />);
        expect(screen.getByText(/Data Types in JavaScript/i)).toBeInTheDocument();
    });

    it('detects a number type', () => {
        render(<DataTypesConcept />);
        const input = screen.getByLabelText(/Type a value/i);
        fireEvent.change(input, { target: { value: '123' } });
        expect(screen.getByText(/Number/i)).toBeInTheDocument();
    });

    it('detects a boolean type', () => {
        render(<DataTypesConcept />);
        const input = screen.getByLabelText(/Type a value/i);
        fireEvent.change(input, { target: { value: 'true' } });
        expect(screen.getByText(/Boolean/i)).toBeInTheDocument();
    });

    it('detects a string type', () => {
        render(<DataTypesConcept />);
        const input = screen.getByLabelText(/Type a value/i);
        fireEvent.change(input, { target: { value: 'hello' } });
        expect(screen.getByText(/String/i)).toBeInTheDocument();
    });

    it('detects an array type', () => {
        render(<DataTypesConcept />);
        const input = screen.getByLabelText(/Type a value/i);
        fireEvent.change(input, { target: { value: '[1,2,3]' } });
        expect(screen.getByText(/Array/i)).toBeInTheDocument();
    });

    it('detects an object type', () => {
        render(<DataTypesConcept />);
        const input = screen.getByLabelText(/Type a value/i);
        fireEvent.change(input, { target: { value: '{a:1}' } });
        expect(screen.getByText(/Object/i)).toBeInTheDocument();
    });
});