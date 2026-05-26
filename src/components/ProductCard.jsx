import { getStockStatus } from '../utils/product';

export function ProductCard({ product, isFavorite, isCompared, onToggleFavorite, onToggleCompare }) {
  const discounted = product.discountPercentage > 0;

  return (
    <article className={`product-card ${isCompared ? 'is-compared' : ''}`}>
      <div className="image-wrap">
        <img src={product.thumbnail} alt={`${product.title} product image`} loading="lazy" />
        <span className={`stock-pill ${product.stock > 0 ? 'available' : 'unavailable'}`}>
          {getStockStatus(product.stock)}
        </span>
      </div>
      <div className="product-body">
        <div>
          <p className="category">{product.category}</p>
          <h3>{product.title}</h3>
          <p className="brand">{product.brand || 'Brand unavailable'}</p>
        </div>

        <dl className="facts">
          <div>
            <dt>Price</dt>
            <dd>${product.price}</dd>
          </div>
          <div>
            <dt>Rating</dt>
            <dd>{product.rating}</dd>
          </div>
          <div>
            <dt>Stock</dt>
            <dd>{product.stock}</dd>
          </div>
          <div>
            <dt>Discount</dt>
            <dd>{discounted ? `${product.discountPercentage}%` : 'None'}</dd>
          </div>
        </dl>

        <div className="actions">
          <button
            className={isFavorite ? 'selected-button' : 'secondary-button'}
            type="button"
            onClick={() => onToggleFavorite(product.id)}
            aria-pressed={isFavorite}
          >
            {isFavorite ? 'Favorited' : 'Favorite'}
          </button>
          <button
            className={isCompared ? 'selected-button' : 'secondary-button'}
            type="button"
            onClick={() => onToggleCompare(product.id)}
            aria-pressed={isCompared}
          >
            {isCompared ? 'Selected' : 'Compare'}
          </button>
        </div>
      </div>
    </article>
  );
}
