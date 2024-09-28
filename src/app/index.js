import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Main from './main';
import ProductDetail from './product-detail';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { LanguageProvider } from '../language-settings/language-context';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const { setModal } = useStore();

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Basket />} />
        </Routes>
        {activeModal === 'basket' && <Basket />}
      </Router>
    </LanguageProvider>
  );
}

export default App;
