import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import { useTranslation } from '../../language-settings/use-translation';
import PageLayout from '../../components/page-layout';
import ProductDescription from '../../components/product-description';
import ProductDetails from '../../components/product-details';
import ProductPrice from '../../components/product-price';
import ProductAddButton from '../../components/product-add-button';
import './style.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const translate = useTranslation();
  const [productDetailState, setProductDetailState] = useState(() => store.getState().productDetailState);

  useEffect(() => {
    const updateState = () => {
      setProductDetailState(store.getState().productDetailState);
    };

    const unsubscribe = store.subscribe(updateState);
    store.actions.productDetailState.fetchProduct(id);

    return () => unsubscribe();
  }, [id, store.actions.productDetailState]);

  const { product, isLoading, error } = productDetailState;

  if (isLoading) return <div>{translate('product.loading')}</div>;
  if (error) return <div>{translate('product.error', { error })}</div>;
  if (!product) return null;

  const handleAddToBasket = () => {
    store.actions.basket.addToBasket(product._id);
  };

  const handleGoToCart = () => {
    store.actions.modals.open('basket');
  };

  return (
    <PageLayout>
      <Head title={product.title} />
      <BasketTool onOpen={handleGoToCart} />
      <ProductDescription description={product.description} />
      <ProductDetails
        madeIn={product.madeIn?.title}
        category={product.category?.title}
        releaseYear={product.edition}
      />
      <ProductPrice price={product.price} />
      <ProductAddButton onAdd={handleAddToBasket} />
    </PageLayout>
  );
}

export default ProductDetail;
