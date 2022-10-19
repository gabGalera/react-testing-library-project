import { React } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('03. Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos;', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link);
    expect(screen.getByText(/No favorite pokemon found/i))
      .toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const detalhesHome = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detalhesHome);

    const favorito = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favorito);

    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link);

    const detalhesFav = screen.getByRole('link', { name: 'More details' });
    expect(detalhesFav)
      .toBeInTheDocument();
  });
});
