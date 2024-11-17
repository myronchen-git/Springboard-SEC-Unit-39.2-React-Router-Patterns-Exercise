import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

import RoutesList from './RoutesList';

import { colors, hexToRgb } from './components/_testCommon';

// ==================================================

describe('ColorFactoryApp', () => {
  it('renders', () => {
    render(
      <MemoryRouter initialEntries={['/colors']}>
        <RoutesList />
      </MemoryRouter>
    );
  });

  it('matches snapshot.', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/colors']}>
        <RoutesList />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('loads the color list.', () => {
    // Arrange
    const { getByText } = render(
      <MemoryRouter initialEntries={['/colors']}>
        <RoutesList />
      </MemoryRouter>
    );

    const colorElements = Object.keys(colors).map((color) => getByText(color));

    // Assert
    // Currently, test colors and default colors are the same, but in the
    // future, this might change.  These expectations for test colors can be
    // unreliable.
    colorElements.forEach((el) => expect(el).toBeVisible());

    expect(getByText('Welcome to the color factory.')).toBeVisible();
    expect(getByText('Please select a color.')).toBeVisible();
  });

  it('adds a new color.', () => {
    // Arrange
    const newColorName = 'orange';
    const newColorHexValue = '#ffa500';

    const { container, getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={['/colors']}>
        <RoutesList />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Add a color'));

    const addNewColorBtn = getByText('Add this color');
    expect(addNewColorBtn).toBeVisible();

    // Act
    const nameInput = getByLabelText('Color Name');
    const valueInput = getByLabelText('Color Value');

    fireEvent.change(nameInput, { target: { value: newColorName } });
    fireEvent.change(valueInput, { target: { value: newColorHexValue } });
    fireEvent.click(addNewColorBtn);

    // Assert
    expect(getByText('Please select a color.')).toBeVisible();

    const newColorLink = getByText(newColorName);
    expect(newColorLink).toBeVisible();
    fireEvent.click(newColorLink);

    expect(getByText(newColorName.toUpperCase())).toBeVisible();

    const colorPageMainElement = container.querySelector('.ColorPage');
    expect(colorPageMainElement).toHaveStyle({
      backgroundColor: hexToRgb(newColorHexValue),
    });

    fireEvent.click(getByText('GO BACK'));

    expect('Welcome to the color factory.');
  });

  it(
    'routes back to list of colors if trying to ' +
      'view a non-existent color.',
    () => {
      // Arrange
      const unknownColor = 'yellow';

      const { getByText } = render(
        <MemoryRouter initialEntries={[`/colors/${unknownColor}`]}>
          <RoutesList />
        </MemoryRouter>
      );

      // Assert
      expect(getByText('Welcome to the color factory.')).toBeVisible();
    }
  );
});
