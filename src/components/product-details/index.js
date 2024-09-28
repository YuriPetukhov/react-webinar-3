import { useTranslation } from '../../language-settings/use-translation';
import './style.css';

function ProductDetails({ madeIn, category, releaseYear, price }) {
  const translate = useTranslation();

  return (
    <div className="ProductDetails">
      <div className="MadeIn">
        {translate('product.madeIn')}: <strong>{madeIn || translate('unknown')}</strong>
      </div>
      <div className="Category">
        {translate('product.category')}: <strong>{category || translate('unknown')}</strong>
      </div>
      <div className="RealiseYear">
        {translate('product.releaseYear')}: <strong>{releaseYear || translate('unknown')}</strong>
      </div>
      <div className="ProductPrice">
        {translate('product.price')}:{' '}
        <strong>
          {price} {translate('currency.rub')}
        </strong>
      </div>
    </div>
  );
}

export default ProductDetails;
