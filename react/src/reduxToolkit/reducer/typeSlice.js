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
  },
});

export const { toggleType, setType } = typeSlice.actions;
export default typeSlice.reducer;