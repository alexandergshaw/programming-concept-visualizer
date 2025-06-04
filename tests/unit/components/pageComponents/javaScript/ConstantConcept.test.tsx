import ConstantConcept from '@/components/pageComponents/JavaScript/ConstantConcept';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ConstantConcept', () => {
    it('renders the main title', () => {
        render(<ConstantConcept />);
        expect(screen.getByText(/Constants in JavaScript/i)).toBeInTheDocument();
    });

    it('shows error for constant name starting with digit', () => {
        render(<ConstantConcept />);
        const input = screen.getByLabelText(/Constant Name/i);
        fireEvent.change(input, { target: { value: '1CONST' } });
        expect(screen.getByText(/cannot start with a digit/i)).toBeInTheDocument();
    });

    it('shows error for constant name with lowercase', () => {
        render(<ConstantConcept />);
        const input = screen.getByLabelText(/Constant Name/i);
        fireEvent.change(input, { target: { value: 'myConst' } });
        expect(screen.getByText(/should be all uppercase/i)).toBeInTheDocument();
    });

    it('accepts a valid constant name', () => {
        render(<ConstantConcept />);
        const input = screen.getByLabelText(/Constant Name/i);
        fireEvent.change(input, { target: { value: 'MY_CONST' } });
        expect(screen.getByText(/That is a valid constant name!/i)).toBeInTheDocument();
    });

    it('updates constant value field', () => {
        render(<ConstantConcept />);
        const valueInput = screen.getByLabelText(/Constant Value/i);
        fireEvent.change(valueInput, { target: { value: '42' } });
        expect(valueInput).toHaveValue(42);
    });
});