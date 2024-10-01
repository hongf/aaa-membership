import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { IMember } from '../../schema/memberSchema';
import { Box } from '@mui/material';
import { MockMemberList } from './MockMemberList';

export const MemberSearch = () => {
  const columns = useMemo<MRT_ColumnDef<IMember>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'id',
        header: 'Name',
        grow: true,
        Cell: ({ renderedCellValue, row }) => (
          <Box>
            {`${row.original.title} ${row.original.firstName} ${row.original.lastName}`}
          </Box>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'telephone',
      },
      {
        accessorKey: 'address.formattedAddress',
        header: 'Address',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'membershipStatedFrom',
        header: 'Membership started from',
      },
      {
        accessorKey: 'expiryDate',
        header: 'Expiry date',
      },
      {
        accessorKey: 'dob',
        header: 'Date of birth',
      },
    ],
    []
    //end
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={MockMemberList}
      enableGlobalFilterModes
      initialState={{
        showGlobalFilter: true,
      }}
      positionGlobalFilter="left"
      muiSearchTextFieldProps={{
        placeholder: `Search member`,
        sx: { minWidth: '300px' },
        variant: 'outlined',
      }}
    />
  );
};
