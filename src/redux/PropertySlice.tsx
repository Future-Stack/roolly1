import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface Property {
  image: string;
  type: string;
  status: string;
  title: string;
  price: string;
  description: string;
}

interface PropertyState {
  selectedProperty: Property | null;
}

const initialState: PropertyState = {
  selectedProperty: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setSelectedProperty: (state, action: PayloadAction<Property>) => {
      state.selectedProperty = action.payload;
    },
  },
});

export const { setSelectedProperty } = propertySlice.actions;
export default propertySlice.reducer;
