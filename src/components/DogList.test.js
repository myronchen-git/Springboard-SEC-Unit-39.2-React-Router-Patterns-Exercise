import { render, fireEvent } from '@testing-library/react';
import { useOutletContext } from 'react-router-dom';

import DogList from './DogList';

import {dogs} from '../../db.json' with {type: 'json'};

// ==================================================

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
  useNavigate: () => mockNavigate,
}));

// --------------------------------------------------

describe('DogList', () => {
  beforeEach(() => {
    useOutletContext.mockReset();
    useOutletContext.mockReturnValue({ dogs });

    mockNavigate.mockReset();
  });

  it('renders.', () => {
    render(<DogList />);
  });

  it('matches snapshot.', () => {
    const { asFragment } = render(<DogList />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays dog pictures', () => {
    // Arrange
    const { getByAltText } = render(<DogList />);

    const imageElements = dogs.map((dog) => getByAltText(dog.name));

    // Assert
    imageElements.forEach((elem) => expect(elem).toBeVisible());
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("links to a dog's details page after clicking on a dog.", () => {
    // Arrange
    const { getByText } = render(<DogList />);

    // Act
    fireEvent.click(getByText(dogs[0].name));

    // Assert
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
