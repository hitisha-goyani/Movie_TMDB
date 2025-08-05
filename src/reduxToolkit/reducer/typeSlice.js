import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: localStorage.getItem('selectedType') || 'movie',
};

const typeSlice = createSlice({
  name: 'typeToggle',
  initialState,
  reducers: {
    toggleType: (state) => {
      state.type = state.type === 'movie' ? 'tv' : 'movie';
      localStorage.setItem('selectedType', state.type);
    },
    setType: (state, action) => {
      state.type = action.payload;
      localStorage.setItem('selectedType', state.type);
    },
    setSearch: (state, action) => action.payload
  },
});

export const { toggleType, setType, setSearch } = typeSlice.actions;
export default typeSlice.reducer;