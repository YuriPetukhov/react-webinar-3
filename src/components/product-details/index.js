import { useTranslation } from '../../language-settings/use-translation';

function ProductDetails({ madeIn, category, releaseYear }) {
  const translate = useTranslation();

  return (
    <ul>
      <li>
        {translate('product.madeIn')}: <strong>{madeIn || translate('unknown')}</strong>
      </li>
      <li>
        {translate('product.category')}: <strong>{category || translate('unknown')}</strong>
      </li>
      <li>
        {translate('product.releaseYear')}: <strong>{releaseYear || translate('unknown')}</strong>
      </li>
    </ul>
  );
}

export default ProductDetails;
