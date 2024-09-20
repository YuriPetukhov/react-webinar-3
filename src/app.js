import React, { useState, useCallback, useMemo } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';


function App({ store }) {
  const { cartItems, totalItems, totalPrice } = store.getState();
  const [isModalOpen, setModalOpen] = useState(false);
  const list = store.getState().list;

  const addToCart = useCallback((code) => {
    store.addItemToCart(code);
  }, []);

  const removeFromCart = useCallback((code) => {
    store.removeItemFromCart(code);
  }, []);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <PageLayout>
      <Head title="Магазин" totalItems={totalItems} totalPrice={totalPrice} />
      <Controls onAdd={openModal} />
      <List list={list} onAddToCart={addToCart} />

      {isModalOpen && (
        <CartModal
          cartItems={cartItems}
          totalPrice={totalPrice}
          onClose={closeModal}
          onRemoveAll={removeFromCart}
        />
      )}
    </PageLayout>
  );
}


export default App;
