import * as React from 'react';

import { Table } from 'evergreen-ui';
import _ from 'lodash';
import moment from 'moment';

const { Row, TextCell } = Table;

export const RowBuilder = props => {
  const model = props.model;

  if (!model) return null;

  const key = props.key || `table_${moment().format()}`,
    isSelectable = props.isSelectable || false,
    onSelect = props.onSelect || console.error('Please implement'),
    columns = props.columns || [],
    properties = _.keys(model);

  /**
   * If client pass as props a component,
   * all cells will be wrapped into this component.
   * Otherwise in a simple TextCell Component.
   *
   * @param {*} property
   * @returns
   */
  const switchCell = (property, key) => {
    const propers = _.keys(property),
      val = model[property['dataIndex']],
      hasRender = _.includes(propers, 'render');

    if (hasRender) {
      return (
        <TextCell key={key} style={{ padding: 0 }}>
          {property.render(val, model)}
        </TextCell>
      );
    } else {
      return <TextCell key={key}>{val}</TextCell>;
    }
  };

  return (
    <Row key={key} isSelectable={isSelectable} onSelect={onSelect}>
      {columns
        .filter(prop => _.includes(properties, prop.dataIndex))
        .map((prop, key) => switchCell(prop, key))}
    </Row>
  );
};
