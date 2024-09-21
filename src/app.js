import React, { useState, useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';
import Cart from './components/cart';

function App({ store }) {
  const { cartItems, totalItems, totalPrice } = store.getState();
  const [isModalOpen, setModalOpen] = useState(false);
  const list = store.getState().list;

  const addToCart = useCallback(code => {
    store.addItemToCart(code);
  }, []);

  const removeFromCart = useCallback(code => {
    store.removeItemFromCart(code);
  }, []);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <PageLayout>
      <Head title="Магазин" totalItems={totalItems} totalPrice={totalPrice} onAdd={openModal} />
      <List list={list} onAddToCart={addToCart} />

      {isModalOpen && (
        <Modal title="Корзина" onClose={closeModal}>
          <Cart cartItems={cartItems} onRemoveAll={removeFromCart} />
          <div className="Modal-footer">
            <p className="Total-label">Итого</p>
            <p className="Total-price">{totalPrice.toLocaleString('ru-RU')} ₽</p>
          </div>
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
