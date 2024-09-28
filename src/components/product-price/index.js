import { useTranslation } from '../../language-settings/use-translation';

function ProductPrice({ price }) {
  const translate = useTranslation();

  return (
    <li>
      {translate('product.price')}:{' '}
      <strong>
        {price} {translate('currency.rub')}
      </strong>
    </li>
  );
}

export default ProductPrice;
