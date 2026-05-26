# Product Catalog

A simple React product catalog that fetches products from `https://dummyjson.com/products?limit=30`.

## Install and Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://127.0.0.1:5173`.

## Build

```bash
npm run build
```

The production build is created in `dist/`.

## Deploy to GitHub Pages

This project is configured for the GitHub Pages URL:

```text
https://alexpopov03.github.io/product-catalog
```

To deploy manually:

```bash
npm run deploy
```

That command builds the app and publishes the `dist/` folder to the `gh-pages` branch. In the GitHub repository settings, set Pages to deploy from the `gh-pages` branch.

## Implemented

- Product fetch with loading and error states.
- Responsive product grid on desktop and single-column cards on mobile.
- Product cards with image, title, brand fallback, category, price, discount, rating, and stock status.
- Search by title, brand, and category.
- Filters for category, in-stock products, and discounted products.
- Sorting by price low/high, rating high/low, and title A-Z.
- Favorites with localStorage persistence and a separate favorites section.
- Compare selection for up to 3 products with localStorage persistence.
- Comparison table with title, price, rating, stock, category, and discount.
- Empty states for no matches, no favorites, and no compare items.
- Reset filters button.
- Plain CSS transitions, responsive layout, visible focus states, labels, semantic buttons, and meaningful image alt text.

## Known Issues

- The app depends on the DummyJSON API being reachable from the browser.
- Favorites and compare lists are stored by product ID, so if the remote product data changes significantly those saved IDs may no longer map to the same products.
