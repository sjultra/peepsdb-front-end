import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  modal: {
    closeOnEsc: true,
    size: '4xl',
    children: null,
    payload: null,
    isOpen: false,
  },
};

const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    openMod: (state, action) => {
      // console.log('opening modal payload',action.payload)
      let modalPayload = {
        ...state.modal,
        isOpen: action.payload?.isOpen,
        children: action.payload?.children,
        payload: action?.payload?.payload,
        closeCb: () => action?.payload?.onClose && action.payload.onClose(),
      };
      state.modal = modalPayload;
    },
    closeMod: (state) => {
      state.modal.closeCb && state.modal.closeCb();
      state.modal = initialState.modal;
    },
  },
});

export const selectWidget = (state) => state.widget;

export const { actions: widgetActions, reducer: widgetReducer } = widgetSlice;

export default widgetSlice.reducer;
