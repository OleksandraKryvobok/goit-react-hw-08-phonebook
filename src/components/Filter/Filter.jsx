import { Input } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';

const Filter = () => {
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();

    const changeFilter = e => {
      const filterValue = e.target.value;
  
      dispatch(setFilter(filterValue));
    };

    return (
        <Input type="text" value={filter} onChange={changeFilter} />
    );
};

export default Filter;