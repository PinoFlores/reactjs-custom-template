import { Table } from 'evergreen-ui';
import { SearcherCell } from '../filters/SearcherCell';
import { SelectorCell } from '../filters/SelectorCell';

const { TextHeaderCell } = Table;

export const filterBuilder = (columnsDefinitions = []) => {
  const defaultHandler = () =>
    console.error('Please implement the handler for this filer.');

  return columnsDefinitions.map(column => {
    const { title, key, filter } = column;
    const { type } = filter || { type: 'cell' };

    if (type === 'cell') {
      return <TextHeaderCell key={key}>{title}</TextHeaderCell>;
    } else {
      const { handler } = filter || defaultHandler;
      switch (type) {
        case 'search':
          return <SearcherCell title={title} handler={handler} />;
        case 'select':
          return <SelectorCell title={title} handler={handler} />;
        default:
          return <TextHeaderCell key={key}>{title}</TextHeaderCell>;
      }
    }
  });
};
