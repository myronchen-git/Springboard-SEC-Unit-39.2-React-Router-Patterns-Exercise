import { render, fireEvent } from '@testing-library/react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import DogList from './DogList';

import {dogs} from '../../db.json' with {type: 'json'};

// ==================================================

jest.mock('react-router-dom');

// --------------------------------------------------

describe('DogList', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useOutletContext.mockReturnValue({ dogs });
    useNavigate.mockReturnValue(mockNavigate);
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
