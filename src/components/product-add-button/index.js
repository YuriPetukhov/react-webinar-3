import { useTranslation } from '../../language-settings/use-translation';

function ProductAddButton({ onAdd }) {
  const translate = useTranslation();

  return (
    <button className="add-button" onClick={onAdd}>
      {translate('controls.add')}
    </button>
  );
}

export default ProductAddButton;
