import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import axios from 'axios';

import RoutesList from './RoutesList';

import {dogs} from '../db.json' with {type: 'json'};

// ==================================================

jest.mock('axios');

// --------------------------------------------------

describe('DogFinderApp', () => {
  beforeEach(() => {
    const dogDataForApi = dogs.map((dog, i) => ({ ...dog, id: `dog${i}` }));
    axios.get.mockResolvedValue({ data: dogDataForApi });
  });

  it('renders', () => {
    render(
      <MemoryRouter initialEntries={['/dogs']}>
        <RoutesList />
      </MemoryRouter>
    );
  });

  it('matches snapshot.', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/dogs']}>
        <RoutesList />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('loads the dog list.', async () => {
    // Arrange
    const { findByAltText } = render(
      <MemoryRouter initialEntries={['/dogs']}>
        <RoutesList />
      </MemoryRouter>
    );

    const dogImage = await findByAltText(dogs[0].name);

    // Assert
    expect(dogImage).toBeVisible();
  });

  it("goes to a dog's details page.", async () => {
    // Arrange
    const { findByAltText, findByText } = render(
      <MemoryRouter initialEntries={['/dogs']}>
        <RoutesList />
      </MemoryRouter>
    );

    const dogImage = await findByAltText(dogs[0].name);

    // Act
    fireEvent.click(dogImage);

    // Assert
    expect(await findByText(dogs[0].facts[0])).toBeVisible();
  });

  it("navigates to a dog's details page.", async () => {
    // Arrange
    const { findAllByText, findByText } = render(
      <MemoryRouter initialEntries={['/dogs']}>
        <RoutesList />
      </MemoryRouter>
    );

    const nameElements = await findAllByText(dogs[0].name);
    const navBtn = nameElements.find(el => {
      return el.nodeName === 'A' && el.parentElement.className === 'Nav';
    });

    // Act
    fireEvent.click(navBtn);

    // Assert
    expect(await findByText(dogs[0].facts[0])).toBeVisible();
  });

  it('navigates to home.', async () => {
    // Arrange
    const { findAllByText, findByAltText, findByText } = render(
      <MemoryRouter initialEntries={['/dogs']}>
        <RoutesList />
      </MemoryRouter>
    );

    const nameElements = await findAllByText(dogs[0].name);
    const navBtn = nameElements.find(el => {
      return el.nodeName === 'A' && el.parentElement.className === 'Nav';
    });

    fireEvent.click(navBtn);

    // Act
    const homeBtn = await findByText('Home');
    fireEvent.click(homeBtn);

    // Assert
    const dogImages = [];
    for (const dog of dogs) {
      dogImages.push(await findByAltText(dog.name));
    }

    dogImages.forEach(image => expect(image).toBeVisible());
  });
});
