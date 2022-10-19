import { React } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('05. Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  test('Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const next = screen.getByRole('button', { name: /próximo/i });
    userEvent.click(next);

    const charmander = screen.getByAltText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);

    const pikachu = screen.getByAltText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um pokémon por vez.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const next = screen.getByRole('button', { name: /próximo/i });
    userEvent.click(next);
    const links = screen.getAllByRole('link', { name: /more details/i });
    expect(links.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const btns = screen.getAllByTestId('pokemon-type-button');
    const types = btns.map((type) => type.innerHTML);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    types.forEach((type) => {
      const btn = screen.getByRole('button', { name: type });
      userEvent.click(btn);
      expect(screen.getByTestId('pokemon-type').innerHTML).toBe(type);
      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const all = screen.getByRole('button', { name: 'All' });

    expect(all).toHaveTextContent('All');
    userEvent.click(all);
    const typeInOrder = pokemons.map((pokemon) => pokemon.type);
    typeInOrder.forEach((type) => {
      const btn = screen.getByRole('button', { name: /próximo/i });
      expect(screen.getByTestId('pokemon-type').innerHTML).toBe(type);
      userEvent.click(btn);
      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    });
  });
});
