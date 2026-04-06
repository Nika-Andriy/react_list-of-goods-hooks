import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortOption {
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortOption,
  reversed: boolean,
) {
  const result = [...goods];

  if (sortField === SortOption.Alphabet) {
    result.sort((a, b) => a.localeCompare(b));
  } else if (sortField === SortOption.Length) {
    result.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortOption>(SortOption.None);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortOption.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortField(SortOption.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortOption.Length ? '' : 'is-light'}`}
          onClick={() => setSortField(SortOption.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField !== SortOption.None || reversed) && (
          <button
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortOption.None);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
