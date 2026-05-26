import { useEffect, useMemo, useState } from 'react';
import { CompareSection } from './components/CompareSection';
import { Controls } from './components/Controls';
import { FavoritesSection } from './components/FavoritesSection';
import { PageHeader } from './components/PageHeader';
import { ProductsSection } from './components/ProductsSection';
import { API_URL, COMPARE_KEY, FAVORITES_KEY, MAX_COMPARE_ITEMS } from './constants';
import { readStoredIds } from './utils/storage';

export function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState('title-az');
  const [favoriteIds, setFavoriteIds] = useState(() => readStoredIds(FAVORITES_KEY));
  const [compareIds, setCompareIds] = useState(() => readStoredIds(COMPARE_KEY));
  const [compareMessage, setCompareMessage] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        setStatus('loading');
        setError('');
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!ignore) {
          setProducts(Array.isArray(data.products) ? data.products : []);
          setStatus('success');
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message || 'Unable to load products.');
          setStatus('error');
        }
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareIds));
  }, [compareIds]);

  const productsById = useMemo(() => {
    return new Map(products.map((product) => [product.id, product]));
  }, [products]);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category).filter(Boolean))].sort();
  }, [products]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        product.title?.toLowerCase().includes(normalizedQuery) ||
        product.brand?.toLowerCase().includes(normalizedQuery) ||
        product.category?.toLowerCase().includes(normalizedQuery);

      const matchesCategory = category === 'all' || product.category === category;
      const matchesStock = !inStockOnly || product.stock > 0;
      const matchesDiscount = !discountOnly || product.discountPercentage > 0;

      return matchesQuery && matchesCategory && matchesStock && matchesDiscount;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating-high':
          return b.rating - a.rating;
        case 'title-az':
        default:
          return a.title.localeCompare(b.title);
      }
    });
  }, [products, query, category, inStockOnly, discountOnly, sortBy]);

  const favoriteProducts = useMemo(() => {
    return favoriteIds.map((id) => productsById.get(id)).filter(Boolean);
  }, [favoriteIds, productsById]);

  const compareProducts = useMemo(() => {
    return compareIds.map((id) => productsById.get(id)).filter(Boolean);
  }, [compareIds, productsById]);

  function toggleFavorite(id) {
    setFavoriteIds((currentIds) =>
      currentIds.includes(id) ? currentIds.filter((favoriteId) => favoriteId !== id) : [...currentIds, id],
    );
  }

  function toggleCompare(id) {
    setCompareMessage('');
    setCompareIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds.filter((compareId) => compareId !== id);
      }

      if (currentIds.length >= MAX_COMPARE_ITEMS) {
        setCompareMessage('You can compare up to 3 products. Remove one before adding another.');
        return currentIds;
      }

      return [...currentIds, id];
    });
  }

  function resetFilters() {
    setQuery('');
    setCategory('all');
    setInStockOnly(false);
    setDiscountOnly(false);
    setSortBy('title-az');
  }

  return (
    <main className="app-shell">
      <PageHeader productCount={products.length} favoriteCount={favoriteIds.length} compareCount={compareIds.length} />

      <Controls
        query={query}
        category={category}
        categories={categories}
        inStockOnly={inStockOnly}
        discountOnly={discountOnly}
        sortBy={sortBy}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onInStockOnlyChange={setInStockOnly}
        onDiscountOnlyChange={setDiscountOnly}
        onSortByChange={setSortBy}
        onResetFilters={resetFilters}
      />

      {compareMessage && (
        <p className="notice" role="status">
          {compareMessage}
        </p>
      )}

      <ProductsSection
        status={status}
        error={error}
        products={visibleProducts}
        favoriteIds={favoriteIds}
        compareIds={compareIds}
        onToggleFavorite={toggleFavorite}
        onToggleCompare={toggleCompare}
      />

      <FavoritesSection products={favoriteProducts} onRemoveFavorite={toggleFavorite} />

      <CompareSection products={compareProducts} onRemoveCompare={toggleCompare} />
    </main>
  );
}
