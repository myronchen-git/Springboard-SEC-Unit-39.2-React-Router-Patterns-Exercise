import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import RoutesList from './RoutesList';

// ==================================================

describe('CalculatorApp', () => {
  it('adds', () => {
    // Arrange
    const nums = [1, 2];

    // Act
    const { getByText } = render(
      <MemoryRouter initialEntries={[`/calculator/add/${nums[0]}/${nums[1]}`]}>
        <RoutesList />
      </MemoryRouter>
    );

    // Assert
    expect(getByText('1 + 2 = 3')).toBeVisible();
  });

  it('subtracts', () => {
    // Arrange
    const nums = [1, 2];

    // Act
    const { getByText } = render(
      <MemoryRouter
        initialEntries={[`/calculator/subtract/${nums[0]}/${nums[1]}`]}
      >
        <RoutesList />
      </MemoryRouter>
    );

    // Assert
    expect(getByText('1 - 2 = -1')).toBeVisible();
  });

  it('multiplies', () => {
    // Arrange
    const nums = [1, 0];

    // Act
    const { getByText } = render(
      <MemoryRouter
        initialEntries={[`/calculator/multiply/${nums[0]}/${nums[1]}`]}
      >
        <RoutesList />
      </MemoryRouter>
    );

    // Assert
    expect(getByText('1 * 0 = 0')).toBeVisible();
  });

  it('divides', () => {
    // Arrange
    const nums = [10, 2];

    // Act
    const { getByText } = render(
      <MemoryRouter
        initialEntries={[`/calculator/divide/${nums[0]}/${nums[1]}`]}
      >
        <RoutesList />
      </MemoryRouter>
    );

    // Assert
    expect(getByText('10 / 2 = 5')).toBeVisible();
  });

  it('does not divide by 0', () => {
    // Arrange
    const nums = [1, 0];

    // Act
    const { getByText } = render(
      <MemoryRouter
        initialEntries={[`/calculator/divide/${nums[0]}/${nums[1]}`]}
      >
        <RoutesList />
      </MemoryRouter>
    );

    // Assert
    expect(getByText('Can not divide by 0.')).toBeVisible();
  });

  it('displays an error message if the operation is unrecognized.', () => {
    // Arrange
    const nums = [1, 1];

    // Act
    const { getByText } = render(
      <MemoryRouter
        initialEntries={[`/calculator/unknown/${nums[0]}/${nums[1]}`]}
      >
        <RoutesList />
      </MemoryRouter>
    );

    // Assert
    expect(getByText('Unrecognized operation', { exact: false })).toBeVisible();
  });

  it.each([
    ['a', 2],
    [1, 'b'],
    ['a', 'b'],
    [1.1, 2],
    [1, 2.2],
    [1.1, 2.2],
  ])(
    'displays an error message if inputs are not integers for inputs [%s, %s].',
    (n1, n2) => {
      for (const operation of ['add', 'subtract', 'multiply', 'divide']) {
        // Act
        const { getAllByText } = render(
          <MemoryRouter
            initialEntries={[`/calculator/${operation}/${n1}/${n2}`]}
          >
            <RoutesList />
          </MemoryRouter>
        );

        // Assert
        const errorMessages = getAllByText('not an integer', { exact: false });
        expect(errorMessages.length).toBeGreaterThanOrEqual(1);
      }
    }
  );
});
