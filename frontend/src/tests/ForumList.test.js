import React from 'react';
import { render, screen } from '@testing-library/react';
import ForumList from '../pages/ForumList';

test('renders ForumList with header', () => {
    render(<ForumList />);
    const headerElement = screen.getByText(/Forums/i);
    expect(headerElement).toBeInTheDocument();
});
