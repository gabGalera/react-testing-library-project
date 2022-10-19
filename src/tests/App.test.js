import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('01.Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: 'Home' });
    userEvent.click(link);
    expect(screen.getByRole('heading', { name: 'Encountered pokémons' }))
      .toHaveTextContent('Encountered pokémons');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: 'About' });
    userEvent.click(link);
    expect(screen.getByRole('heading', { name: 'About Pokédex' }))
      .toHaveTextContent('About Pokédex');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link);
    expect(screen.getByRole('heading', { name: 'Favorite pokémons' }))
      .toHaveTextContent('Favorite pokémons');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const memory = createMemoryHistory();
    render(
      <Router history={ memory }>
        <App />
      </Router>,
    );
    memory.push('/página-errada');
    expect(memory.location.pathname).toBe('/página-errada');
  });
});
