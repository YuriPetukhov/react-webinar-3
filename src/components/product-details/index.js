import { useTranslation } from '../../language-settings/use-translation';
import { numberFormatByLanguage } from '../../utils';
import './style.css';

function ProductDetails({ madeIn, category, releaseYear, price }) {
  const translate = useTranslation();

  const language = translate('currency.rub');

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
          {numberFormatByLanguage(price, language)} {language}
        </strong>
      </div>
    </div>
  );
}

export default ProductDetails;
