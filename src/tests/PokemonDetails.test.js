import { React } from 'react';
import { Router } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';

describe('07. Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do pokémon selecionado são mostradas na tela.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    pokemons.forEach((pokemon) => {
      act(() => {
        history.push(`/pokemons/${pokemon.id}`);
      });
      expect(screen.getByText(pokemon.summary))
        .toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Summary' }))
        .toBeInTheDocument();
      expect(screen.getByRole('heading', { name: `${pokemon.name} Details` }))
        .toBeInTheDocument();
    });
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do pokémon.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    // Parei aqui
    pokemons.forEach((pokemon) => {
      act(() => {
        history.push(`/pokemons/${pokemon.id}`);
      });
      expect(screen.getByRole('heading', { name: `Game Locations of ${pokemon.name}` }))
        .toBeInTheDocument();
      expect(screen.getByRole('heading', { name: `${pokemon.name} Details` }))
        .toBeInTheDocument();
      pokemon
        .foundAt
        .forEach((poke) => {
          expect(screen.getByText(poke.location)).toBeInTheDocument();
          const locationsImgs = screen.getAllByAltText(`${pokemon.name} location`);
          const aux = locationsImgs
            .filter((img) => img.src === poke.map);
          expect(aux.length).toEqual(1);
        });
    });
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    pokemons.forEach((pokemon) => {
      act(() => {
        history.push(`/pokemons/${pokemon.id}`);
      });
      const fav = screen.getByRole('checkbox');
      expect(fav)
        .toBeInTheDocument();
      expect(screen.getByLabelText(/pokémon/i))
        .toBeInTheDocument();
      userEvent.click(fav);
      const favStar = screen.getByAltText(/is marked as/i);
      expect(favStar)
        .toBeInTheDocument();
      userEvent.click(fav);
      expect(favStar)
        .not.toBeInTheDocument();
    });
  });
});
