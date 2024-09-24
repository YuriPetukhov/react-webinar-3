import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import { useTranslation } from '../../use-translation';
import './style.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const store = useStore(); // Получаем доступ к хранилищу
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

  if (!product) return <div>{translate('product.loading')}</div>; // Переведенное сообщение о загрузке

  const handleAddToBasket = () => {
    store.actions.basket.addToBasket(product._id); // Добавляем товар в корзину через store
  };

  const handleGoToCart = () => {
    store.actions.modals.open('basket');
  };

  return (
    <div className="ProductDetail">
      <Head title={product.title} />
      <BasketTool onOpen={handleGoToCart} /> {/* Передаем функцию перехода */}
      <div className="ProductDetails">
        <p>{product.description || translate('descriptionUnavailable')}</p>
        <ul>
          <li>{translate('product.madeIn')}: {product.madeIn?.title || translate('unknown')}</li>
          <li>{translate('product.category')}: {product.category?.title || translate('unknown')}</li>
          <li>{translate('product.releaseYear')}: {product.edition  || translate('unknown')}</li>
          <li>{translate('product.price')}: {product.price} {translate('currency.rub')}</li>
        </ul>
        <button className="add-button" onClick={handleAddToBasket}>{translate('controls.add')}</button>
      </div>
    </div>
  );
}

export default ProductDetail;
