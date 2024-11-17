import { render } from '@testing-library/react';
import { useOutletContext, useParams } from 'react-router-dom';

import ColorPage from './ColorPage';

import { colors, hexToRgb } from './_testCommon';

// ==================================================

jest.mock('react-router-dom');

const [colorName, colorHexValue] = Object.entries(colors)[0];

// --------------------------------------------------

describe('ColorPage', () => {
  const mockGetColorHex = jest.fn();

  beforeEach(() => {
    useOutletContext.mockReturnValue({ getColorHex: mockGetColorHex });
    useParams.mockReturnValue({ color: colorName });

    mockGetColorHex.mockReturnValue(colorHexValue);
  });

  it('renders.', () => {
    render(<ColorPage />);
  });

  it('matches snapshot.', () => {
    const { asFragment } = render(<ColorPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the color', () => {
    // Arrange
    const { container, getByText } = render(<ColorPage />);

    // Assert
    expect(getByText(colorName.toUpperCase())).toBeVisible();

    const mainElement = container.querySelector('.ColorPage');
    expect(mainElement.style.backgroundColor).toBe(hexToRgb(colorHexValue));
  });

  it('does not display the page if the color does not exist.', () => {
    // Arrange
    useParams.mockReset();
    useParams.mockReturnValue({ color: 'black' });

    mockGetColorHex.mockReset();

    const { queryByText } = render(<ColorPage />);

    // Assert
    expect(queryByText(colorName.toUpperCase())).not.toBeInTheDocument();
  });
});
