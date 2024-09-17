import React, { useState, useCallback, useMemo } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';

function App({ store }) {
  const [cart, setCart] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const list = store.getState().list;

  const addToCart = useCallback(item => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[item.code]) {
        newCart[item.code].quantity += 1;
      } else {
        newCart[item.code] = { ...item, quantity: 1 };
      }
      return newCart;
    });
  }, []);

  const removeFromCart = useCallback(code => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[code];
      return newCart;
    });
  }, []);

  const totalItems = useMemo(() => Object.keys(cart).length, [cart]);

  const totalPrice = useMemo(
    () => Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <PageLayout>
      <Head title="Магазин" totalItems={totalItems} totalPrice={totalPrice} />
      <Controls onAdd={openModal} />
      <List list={list} onAddToCart={addToCart} />

      {isModalOpen && (
        <CartModal
          cartItems={Object.values(cart)}
          onClose={closeModal}
          onRemoveAll={removeFromCart}
        />
      )}
    </PageLayout>
  );
}

export default App;
