import StoreModule from '../module';

class ProductDetailState extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.state = this.initState();
  }

  initState() {
    return {
      product: null,
      isLoading: false,
      error: null,
    };
  }

  fetchProduct = async (id) => {
    this.setState(prevState => ({
        ...prevState,
        isLoading: true,
        error: null,
        product: null
    }));
    try {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
        const data = await response.json();
        if (data.result) {
            this.setState(prevState => ({
                ...prevState,
                product: data.result,
                isLoading: false
            }));
        } else {
            throw new Error('Product data not found in the response');
        }
    } catch (error) {
        this.setState(prevState => ({
            ...prevState,
            error: error.message,
            isLoading: false
        }));
    }

  };
  
}

export default ProductDetailState;
