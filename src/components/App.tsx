import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from '../store/redux-storage';
import { MasterLayout } from './layouts/MasterLayout';

function App() {
  return (
    <Provider store={store}>
      <MasterLayout/>
    </Provider>
  );
}

export default App;
