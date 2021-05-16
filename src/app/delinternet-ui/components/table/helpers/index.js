import { Table } from 'evergreen-ui';
import { SearcherCell } from '../filters/SearcherCell';
import { SelectorCell } from '../filters/SelectorCell';

const { TextHeaderCell } = Table;

export const filterBuilder = (columnsDefinitions = []) => {
  const defaultHandler = () =>
    console.error('Please implement the handler for this filer.');

  return columnsDefinitions.map(column => {
    const { title, key, filter, defaultValue } = column;
    const { type } = filter || { type: 'cell', defaultValue: null };

    if (type === 'cell') {
      return <TextHeaderCell key={key}>{title}</TextHeaderCell>;
    } else {
      const { handler } = filter || defaultHandler;
      switch (type) {
        case 'search':
          let { name: searcherName } = filter || { name: 'selected' };
          return (
            <SearcherCell name={searcherName} title={title} handler={handler} />
          );
        case 'select':
          let { options, name: selectorName } = filter || {
            options: [],
            name: 'selected',
          };
          return (
            <SelectorCell
              name={selectorName}
              selected={defaultValue}
              options={options}
              title={title}
              handler={handler}
            />
          );
        default:
          return <TextHeaderCell key={key}>{title}</TextHeaderCell>;
      }
    }
  });
};
