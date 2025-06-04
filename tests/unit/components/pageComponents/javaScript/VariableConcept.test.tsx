import VariableConcept from '@/components/pageComponents/JavaScript/VariableConcept';
import { render, screen, fireEvent } from '@testing-library/react';

describe('VariableConcept', () => {
    it('renders the main title', () => {
        render(<VariableConcept />);
        expect(screen.getByText(/Variables in JavaScript/i)).toBeInTheDocument();
    });

    it('shows error for variable name starting with digit', () => {
        render(<VariableConcept />);
        const input = screen.getByLabelText(/Variable Name/i);
        fireEvent.change(input, { target: { value: '1abc' } });
        expect(screen.getByText(/cannot start with a digit/i)).toBeInTheDocument();
    });

    it('shows error for reserved keyword', () => {
        render(<VariableConcept />);
        const input = screen.getByLabelText(/Variable Name/i);
        fireEvent.change(input, { target: { value: 'let' } });
        expect(screen.getByText(/reserved keyword/i)).toBeInTheDocument();
    });

    it('accepts a valid variable name', () => {
        render(<VariableConcept />);
        const input = screen.getByLabelText(/Variable Name/i);
        fireEvent.change(input, { target: { value: 'myVariable' } });
        expect(screen.getByText(/That is a valid variable name!/i)).toBeInTheDocument();
    });

    it('updates first and second number fields', () => {
        render(<VariableConcept />);
        const firstNum = screen.getByLabelText(/First Number/i);
        const secondNum = screen.getByLabelText(/Second Number/i);
        fireEvent.change(firstNum, { target: { value: '7' } });
        fireEvent.change(secondNum, { target: { value: '2' } });
        expect(firstNum).toHaveValue(7);
        expect(secondNum).toHaveValue(2);
    });
});