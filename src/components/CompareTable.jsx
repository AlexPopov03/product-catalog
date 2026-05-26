import { getStockStatus } from '../utils/product';

export function CompareTable({ products, onRemove }) {
  return (
    <div className="table-scroll">
      <table>
        <caption>Selected product comparison</caption>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Rating</th>
            <th scope="col">Stock</th>
            <th scope="col">Category</th>
            <th scope="col">Discount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th scope="row">{product.title}</th>
              <td>${product.price}</td>
              <td>{product.rating}</td>
              <td>
                {product.stock} <span className="muted">({getStockStatus(product.stock)})</span>
              </td>
              <td>{product.category}</td>
              <td>{product.discountPercentage > 0 ? `${product.discountPercentage}%` : 'None'}</td>
              <td>
                <button type="button" onClick={() => onRemove(product.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
