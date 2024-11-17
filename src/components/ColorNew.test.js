import { fireEvent, render } from '@testing-library/react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import ColorNew from './ColorNew';

import { colors } from './_testCommon';

// ==================================================

jest.mock('react-router-dom');

const [colorName, colorHexValue] = Object.entries(colors)[1];

// --------------------------------------------------

describe('ColorNew', () => {
  const mockSaveColor = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useOutletContext.mockReturnValue({ saveColor: mockSaveColor });
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('renders.', () => {
    render(<ColorNew />);
  });

  it('matches snapshot.', () => {
    const { asFragment } = render(<ColorNew />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can update form data.', () => {
    // Arrange
    const { getByLabelText } = render(<ColorNew />);

    const nameInput = getByLabelText('Color Name');
    const valueInput = getByLabelText('Color Value');

    // Act
    fireEvent.change(nameInput, { target: { value: colorName } });
    fireEvent.change(valueInput, { target: { value: colorHexValue } });

    // Assert
    expect(nameInput.value).toBe(colorName);
    expect(valueInput.value).toBe(colorHexValue);
  });

  it('submits form data.', () => {
    // Arrange
    const { getByLabelText, getByText } = render(<ColorNew />);

    const nameInput = getByLabelText('Color Name');
    const valueInput = getByLabelText('Color Value');
    const submitBtn = getByText('Add this color');

    fireEvent.change(nameInput, { target: { value: colorName } });
    fireEvent.change(valueInput, { target: { value: colorHexValue } });

    // Act
    fireEvent.click(submitBtn);

    // Assert
    expect(mockSaveColor).toHaveBeenCalledTimes(1);
    expect(mockSaveColor).toHaveBeenCalledWith({ [colorName]: colorHexValue });
    expect(mockNavigate).toHaveBeenCalledWith('/colors');
  });
});
