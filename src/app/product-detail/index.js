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
  const [product, setProduct] = useState(null);
  const store = useStore();
  const translate = useTranslation();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
      );
      const data = await response.json();
      if (data.result) {
        setProduct(data.result);
      } else {
        console.error('Product data not found in the response:', data);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>{translate('product.loading')}</div>;

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

