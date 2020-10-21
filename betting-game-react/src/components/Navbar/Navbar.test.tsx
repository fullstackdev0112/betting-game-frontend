import '@testing-library/jest-dom/extend-expect';

import { createMemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';

import { fireEvent, render } from '@testing-library/react';

import { ABOUTUS, LOGIN, MATCHES, STANDINGS } from '../../config/routes';
import Navbar, { navbarButtons } from './Navbar';
import { NavbarButtonProps } from '../NavbarButton/NavbarButton';

describe('Navigation bar for users', () => {
  test('it should render a navbar with a logo, a login button and all navigation buttons', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const navbar = getByTestId('Navbar');
    const navbarLogo = getByTestId('NavbarLogo');
    let navbarButtonsArray: any[] = [];
    navbarButtons.map((navbarButton: NavbarButtonProps, index: number) => {
      navbarButtonsArray.push(
        getByTestId(`${navbarButton.buttonTestIdPrefix}-NavButton`)
      );
    });

    expect(navbar).toBeInTheDocument();
    expect(navbarLogo).toBeInTheDocument();
    navbarButtonsArray.forEach((navbarButton) => {
      expect(navbarButton).toBeInTheDocument();
    });
  });

  test('it should route when the "Matches" button was clicked', () => {
    const { getByTestId } = render(<Navbar />, { wrapper: MemoryRouter });

    const matchesButton = getByTestId(`Matches-NavButton`);
    fireEvent.click(matchesButton);
    const loadedComponent = getByTestId('Matches');

    expect(loadedComponent).toBeInTheDocument();
  });

  test('it should route when the "Standings" button was clicked', () => {
    const { getByTestId } = render(<Navbar />, { wrapper: MemoryRouter });

    const matchesButton = getByTestId(`Standings-NavButton`);
    fireEvent.click(matchesButton);
    const loadedComponent = getByTestId('Standings');

    expect(loadedComponent).toBeInTheDocument();
  });

  test('it should route when the "About us" button was clicked', () => {
    const { getByTestId } = render(<Navbar />, { wrapper: MemoryRouter });

    const matchesButton = getByTestId(`AboutUs-NavButton`);
    fireEvent.click(matchesButton);
    const loadedComponent = getByTestId('AboutUs');

    expect(loadedComponent).toBeInTheDocument();
  });

  test('it should route when the "Login" button was clicked', () => {
    const { getByTestId } = render(<Navbar />, { wrapper: MemoryRouter });

    const matchesButton = getByTestId(`Login-NavButton`);
    fireEvent.click(matchesButton);
    const loadedComponent = getByTestId('Login');

    expect(loadedComponent).toBeInTheDocument();
  });

  test('it should redirect to matches if the path does not exist', () => {
    const history = createMemoryHistory();
    history.push('/bad/route');
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );

    expect(history.location.pathname).toBe('/matches');
  });

  test('it should route to \\matches and render the matches component', () => {
    const history = createMemoryHistory();
    history.push(MATCHES.path);
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );

    expect(history.location.pathname).toBe('/matches');
  });

  test('it should route to \\standings and render the standings component', () => {
    const history = createMemoryHistory();
    history.push(STANDINGS.path);
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );

    expect(history.location.pathname).toBe('/standings');
  });

  test('it should route to \\aboutus and render the about us component', () => {
    const history = createMemoryHistory();
    history.push(ABOUTUS.path);
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );

    expect(history.location.pathname).toBe('/aboutus');
  });

  test('it should route to \\login and render the login component', () => {
    const history = createMemoryHistory();
    history.push(LOGIN.path);
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );

    expect(history.location.pathname).toBe('/login');
  });
});
