import { InputField } from 'components/InputField.tsx';
import { isLetterOnly } from 'utils/stringUtils.ts';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { setSearchQuery } from 'store/slices/serviceLogsSlice.ts';

export const SearchFilter = () => {
  const { searchQuery } = useAppSelector(state => state.serviceLogs);

  const dispatch = useAppDispatch();

  const handleInputChange = (newValue: string) => {
    if (isLetterOnly(newValue)) {
      dispatch(setSearchQuery(newValue));
    }
  };

  return (
    <InputField
      label="Search"
      placeholder="Search..."
      showSearchIcon
      value={searchQuery}
      onChange={handleInputChange}
      sx={{ maxWidth: 260 }}
    />
  );
};
