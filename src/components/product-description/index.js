import { useTranslation } from '../../language-settings/use-translation';

function ProductDescription({ description }) {
  const translate = useTranslation();

  if (!description) {
    return <p>{translate('descriptionUnavailable')}</p>;
  }

  return <p>{description}</p>;
}

export default ProductDescription;
