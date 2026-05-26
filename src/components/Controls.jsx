export function Controls({
  query,
  category,
  categories,
  inStockOnly,
  discountOnly,
  sortBy,
  onQueryChange,
  onCategoryChange,
  onInStockOnlyChange,
  onDiscountOnlyChange,
  onSortByChange,
  onResetFilters,
}) {
  return (
    <section className="controls" aria-label="Search and filters">
      <div className="field field-wide">
        <label htmlFor="search">Search title, brand, or category</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search products"
        />
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((categoryName) => (
            <option key={categoryName} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={sortBy} onChange={(event) => onSortByChange(event.target.value)}>
          <option value="title-az">Title: A-Z</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="rating-high">Rating: high to low</option>
        </select>
      </div>

      <label className="check-control">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => onInStockOnlyChange(event.target.checked)}
        />
        Only in-stock products
      </label>

      <label className="check-control">
        <input
          type="checkbox"
          checked={discountOnly}
          onChange={(event) => onDiscountOnlyChange(event.target.checked)}
        />
        Only discounted products
      </label>

      <button className="secondary-button" type="button" onClick={onResetFilters}>
        Reset filters
      </button>
    </section>
  );
}
