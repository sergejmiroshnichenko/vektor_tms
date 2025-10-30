import { InputField } from 'components/InputField.tsx';
import { isLetterOnly } from 'helpers/stringHelpers.ts';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks.ts';
import { setSearchQuery } from 'store/slices/serviceLogsSlice.ts';

export const SearchFilter = () => {
  const { searchQuery } = useAppSelector(state => state.serviceLogs);

  const dispatch = useAppDispatch();

  const handleChange = (newValue: string) => {
    if (isLetterOnly(newValue) || newValue === '') {
      dispatch(setSearchQuery(newValue));
    }
  };

  // const handleInputChange = useCallback(
  //   debounce((value: string) => {                                  Д О Б А В И Т Ь
  //     if (setSearchKeyword) {
  //       setSearchKeyword(value);
  //     }
  //   }, 300),
  //   [setSearchKeyword]
  // );

  return (
    <InputField
      label="Search"
      placeholder="Search..."
      showSearchIcon
      value={searchQuery}
      onChange={handleChange}
      sx={{ maxWidth: 260 }}
    />
  );
};
