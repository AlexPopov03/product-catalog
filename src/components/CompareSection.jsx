import { CompareTable } from './CompareTable';
import { Section } from './Section';
import { StateMessage } from './StateMessage';

export function CompareSection({ products, onRemoveCompare }) {
  return (
    <Section title="Compare" detail={`${products.length}/3 selected`}>
      {products.length === 0 ? (
        <StateMessage title="Nothing to compare" body="Select up to 3 products to build a comparison table." />
      ) : (
        <CompareTable products={products} onRemove={onRemoveCompare} />
      )}
    </Section>
  );
}
