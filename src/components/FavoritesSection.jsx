import { Section } from './Section';
import { StateMessage } from './StateMessage';

export function FavoritesSection({ products, onRemoveFavorite }) {
  return (
    <Section title="Favorites" detail={`${products.length} saved`}>
      {products.length === 0 ? (
        <StateMessage title="No favorites yet" body="Products you favorite will appear here and stay after reload." />
      ) : (
        <div className="compact-list">
          {products.map((product) => (
            <article className="compact-item" key={product.id}>
              <img src={product.thumbnail} alt={`${product.title} product thumbnail`} />
              <div>
                <strong>{product.title}</strong>
                <span>{product.brand || 'No brand'} · ${product.price}</span>
              </div>
              <button type="button" onClick={() => onRemoveFavorite(product.id)}>
                Remove
              </button>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
