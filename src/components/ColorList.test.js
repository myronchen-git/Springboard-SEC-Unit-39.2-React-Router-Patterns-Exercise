import { render } from '@testing-library/react';
import { useOutletContext } from 'react-router-dom';

import ColorList from './ColorList';

import { colors } from './_testCommon';

// ==================================================

jest.mock('react-router-dom');

// --------------------------------------------------

describe('ColorList', () => {
  beforeEach(() => {
    useOutletContext.mockReturnValue({ colors });
  });

  it('renders.', () => {
    render(<ColorList />);
  });

  it('matches snapshot.', () => {
    const { asFragment } = render(<ColorList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays a list of colors.', () => {
    // Arrange
    const { getByText } = render(<ColorList />);

    // Assert
    expect(getByText('Welcome to the color factory.')).toBeVisible();
    expect(getByText('Please select a color.')).toBeVisible();
  });
});
