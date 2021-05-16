import React from 'react';

import {
  FilterIcon,
  IconButton,
  Position,
  SelectMenu,
  Table,
} from 'evergreen-ui';

const { TextHeaderCell } = Table;

export const SelectorCell = ({
  name = 'selected',
  title,
  handler,
  options = [],
  selected,
  icon,
}) => {
  const [switchSearch, setSwitchSearch] = React.useState(false);

  const transformOptions = (options = []) => {
    return options.map(label => ({ label, value: label }));
  };

  return (
    <>
      <TextHeaderCell>{title}</TextHeaderCell>
      <SelectMenu
        isShown={switchSearch}
        position={Position.BOTTOM_RIGHT}
        title={title}
        onFilterChange={filter => handler({ filter })}
        selected={selected}
        options={transformOptions(options)}
        onSelect={item => handler({ [name]: item.value })}
        onClose={setSwitchSearch}
      >
        <IconButton
          iconSize={13}
          appearance="minimal"
          icon={icon ? icon : FilterIcon}
        />
      </SelectMenu>
    </>
  );
};
