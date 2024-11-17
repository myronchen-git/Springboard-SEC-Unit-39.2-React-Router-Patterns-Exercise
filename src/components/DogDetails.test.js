import { render } from '@testing-library/react';
import { useParams } from 'react-router-dom';

import DogDetails from './DogDetails';

import {dogs} from '../../db.json' with {type: 'json'};

// ==================================================

const mockGetDog = jest.fn();

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => ({ getDog: mockGetDog }),
  useParams: jest.fn(),
}));

const dogId = '123';

// --------------------------------------------------

describe('DogDetails', () => {
  beforeEach(() => {
    useParams.mockReset();
    useParams.mockReturnValue({ id: dogId });

    mockGetDog.mockReset();
    mockGetDog.mockReturnValue(dogs[0]);
  });

  it('renders', () => {
    render(<DogDetails />);
  });

  it('matches snapshot.', () => {
    const { asFragment } = render(<DogDetails />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays a dog's details.", () => {
    // Arrange
    const { getByAltText, getByText } = render(<DogDetails />);

    // Assert
    expect(getByText(dogs[0].name)).toBeVisible();
    expect(getByText(`Age: ${dogs[0].age}`)).toBeVisible();
    expect(getByAltText(dogs[0].name)).toBeVisible();
    dogs[0].facts.forEach((fact) => expect(getByText(fact)).toBeVisible());

    expect(mockGetDog).toHaveBeenCalledTimes(1);
    expect(mockGetDog).toHaveBeenCalledWith(dogId);
  });

  it('displays error if there is no dog with the specified ID.', () => {
    // Arrange
    mockGetDog.mockReset();

    const { getByText } = render(<DogDetails />);

    // Assert
    expect(getByText('Dog not found!')).toBeVisible();
  });
});
