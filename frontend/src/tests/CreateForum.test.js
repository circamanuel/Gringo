import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateForum from '../pages/CreateForum';

test('renders CreateForum with form elements', () => {
    render(<CreateForum />);
    const inputElement = screen.getByPlaceholderText(/Title/i);
    const buttonElement = screen.getByText(/Create/i);
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
});
