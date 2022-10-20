import { React } from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { screen, render, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('06. Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const btn = screen.getByRole('button', { name: /próximo/i });
    pokemons.forEach((pokemon) => {
      const { value, measurementUnit } = pokemon.averageWeight;
      const img = screen.getByAltText(`${pokemon.name} sprite`);
      expect(img.src).toBe(pokemon.image);
      expect(screen.getByTestId('pokemon-name').innerHTML).toBe(pokemon.name);
      expect(screen.getByTestId('pokemon-type').innerHTML).toBe(pokemon.type);
      expect(screen.getByTestId('pokemon-weight').innerHTML)
        .toBe(`Average weight: ${value} ${measurementUnit}`);
      userEvent.click(btn);
    });
  });

  test('Teste se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const btn = screen.getByRole('button', { name: /próximo/i });
    pokemons.forEach((pokemon) => {
      expect(screen.getByRole('link', { name: /more/i }))
        .toBeInTheDocument();
      act(() => {
        history.push(`/pokemons/${pokemon.id}`);
      });
      expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
      const home = screen.getByRole('link', { name: /home/i });
      userEvent.click(home);
      userEvent.click(btn);
    });
  });

  test('Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const link = screen.getByRole('link', { name: /more/i });
    userEvent.click(link);
    expect(history.location.pathname).toMatch(/pokemons/i);
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver.', () => {
    const historico = createMemoryHistory();
    render(
      <Router history={ historico }>
        <App />
      </Router>,
    );

    const link = screen.getByRole('link', { name: /more/i });
    userEvent.click(link);
    expect(historico.location.pathname).toMatch(/pokemons/i);
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const btn = screen.getByRole('button', { name: /próximo/i });
    pokemons.forEach((pokemon) => {
      act(() => {
        history.push(`/pokemons/${pokemon.id}`);
      });
      const home = screen.getByRole('link', { name: /home/i });
      const fav = screen.getByLabelText(/Pokémon favoritado/i);
      userEvent.click(fav);
      const start = screen.getByAltText(/is marked as/i);
      expect(start.alt).toBe(`${pokemon.name} is marked as favorite`);
      expect(start.src).toBe('http://localhost/star-icon.svg');
      userEvent.click(home);
      userEvent.click(btn);
    });
  });
});
