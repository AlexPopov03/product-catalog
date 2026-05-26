export function PageHeader({ productCount, favoriteCount, compareCount }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">Product Catalog</p>
        <h1>Browse, save, and compare products</h1>
      </div>
      <div className="summary" aria-label="Catalog summary">
        <span>{productCount} products</span>
        <span>{favoriteCount} favorites</span>
        <span>{compareCount}/3 compare</span>
      </div>
    </header>
  );
}
