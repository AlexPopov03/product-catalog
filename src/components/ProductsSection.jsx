import { ProductCard } from './ProductCard';
import { Section } from './Section';
import { StateMessage } from './StateMessage';

export function ProductsSection({
  status,
  error,
  products,
  favoriteIds,
  compareIds,
  onToggleFavorite,
  onToggleCompare,
}) {
  return (
    <Section title="Products" detail={`${products.length} shown`}>
      {status === 'loading' && <StateMessage title="Loading products" body="Fetching product data from DummyJSON." />}
      {status === 'error' && <StateMessage title="Could not load products" body={error} />}
      {status === 'success' && products.length === 0 && (
        <StateMessage title="No matches" body="No products match the current search and filters." />
      )}
      {status === 'success' && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favoriteIds.includes(product.id)}
              isCompared={compareIds.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
