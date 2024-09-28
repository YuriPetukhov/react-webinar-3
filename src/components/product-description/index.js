import { useTranslation } from '../../language-settings/use-translation';
import './style.css'; 

function ProductDescription({ description }) {
  const translate = useTranslation();

  if (!description) {
    return <div className='ProductDescription'>{translate('descriptionUnavailable')}</div>;
  }

  return <div className='ProductDescription'>{description}</div>;
}

export default ProductDescription;
