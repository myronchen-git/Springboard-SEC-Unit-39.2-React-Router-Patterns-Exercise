import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import DogNav from './DogNav';

import {dogs} from '../../db.json' with {type: 'json'};

// ==================================================

describe('DogNav', () => {
  let navData;

  beforeEach(() => {
    navData = dogs.map((dog) => ({ name: dog.name, id: dog.id }));
  });

  it('renders', () => {
    render(
      <MemoryRouter>
        <DogNav navData={navData} />
      </MemoryRouter>
    );
  });

  it('matches snapshot.', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <DogNav navData={navData} />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('shows the correct links.', () => {
    // Arrange
    const { getByText } = render(
      <MemoryRouter>
        <DogNav navData={navData} />
      </MemoryRouter>
    );

    // Assert
    expect(getByText('Home')).toBeVisible();
    dogs.forEach((dog) => expect(getByText(dog.name)).toBeVisible());
  });
});
