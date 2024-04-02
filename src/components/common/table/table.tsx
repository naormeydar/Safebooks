import * as React from 'react';
import MuiTable, { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableContainer, {
  TableContainerProps,
} from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Props<T extends Object> = {
  tableContainerProps?: TableContainerProps;
  columns: string[];
  itemIdentifier: keyof T;
  items: T[];
  bodyCell: {
    render: (row: T, column: string) => React.ReactNode;
    props?: TableCellProps;
  };
  headCell: {
    render: (column: string) => React.ReactNode;
    props?: TableCellProps;
  };
  rowClicked: (row: T) => void;
} & TableProps;

export const Table = <T extends Object>({
  tableContainerProps,
  itemIdentifier,
  items,
  columns,
  headCell,
  bodyCell,
  rowClicked,
  ...props
}: Props<T>) => {
  return (
    <TableContainer {...tableContainerProps} component={Paper} style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <MuiTable {...props}>
        <TableHead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} {...headCell.props}>
                {headCell.render(column)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, index) => (
            <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#edf7ff', cursor: 'pointer' } }} onClick={() => rowClicked(row)}>
              {columns.map((column, columnIndex) => (
                <TableCell key={columnIndex} {...bodyCell.props}>
                  {bodyCell.render(row, column)}
                </TableCell>
              ))}
          </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};