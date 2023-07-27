import { useState } from 'react';
import { HeaderSearchbar, Form } from './Searchbar.styled';
import Notiflix from 'notiflix';
import { HiSearchCircle } from 'react-icons/hi';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  const onSubmitClick = e => {
    e.preventDefault();
    if (value === '') return Notiflix.Notify.failure('Empty input!');
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <HeaderSearchbar>
      <Form onSubmit={onSubmitClick}>
        <button type="submit">
          <HiSearchCircle fill="blue" />
          <span>Search</span>
        </button>

        <input
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
        />
      </Form>
    </HeaderSearchbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
