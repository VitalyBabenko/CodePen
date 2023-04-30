import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../hooks';
import { fetchWorks } from '../../store/works/actions/fetchWorks';
import style from './Search.module.scss';

export const Search = () => {
  const dispatch = useDispatch();
  const searchInput = useInput();
  const { id } = useSelector(state => state.user);

  const submitSearch = e => {
    e.preventDefault();

    dispatch(fetchWorks({ ownerId: id, search: searchInput.value }));
  };

  const clearInput = () => {
    searchInput.setValue('');
  };

  return (
    <form className={style.block} onSubmit={submitSearch}>
      <label>
        SEARCH
        <input
          value={searchInput.value}
          onChange={searchInput.onChange}
          placeholder="Search for..."
        />
        {searchInput.value && <span onClick={clearInput}>✕</span>}
      </label>
      <button type="submit">Search</button>
    </form>
  );
};
