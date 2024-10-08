import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { IMember } from '../../schema/memberSchema';
import { Box, Button, Link } from '@mui/material';
import { MockMemberList } from './MockMemberList';
import { CommonTableConfig } from '../components/CommonTableConfig';
import TimelineIcon from '@mui/icons-material/Timeline';
import CampaignIcon from '@mui/icons-material/Campaign';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

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

  const table = useMaterialReactTable({
    ...CommonTableConfig,
    columns: columns,
    data: MockMemberList,
    getRowId: (row) => row.id || '0',
    initialState: { showGlobalFilter: true },
    positionGlobalFilter: 'left',

    muiSearchTextFieldProps: {
      placeholder: `Search member`,
      sx: { minWidth: '300px' },
      variant: 'outlined',
    },
    enableRowSelection: true,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => [
      <Box>
        <Button startIcon={<TimelineIcon />}>View membership history</Button>
      </Box>,
      <Box>
        <Button startIcon={<CampaignIcon />}>Send renewal notification</Button>
      </Box>,
      <Box>
        <Button startIcon={<NoAccountsIcon />}>Deactivate</Button>
      </Box>,
    ],
  });

  return <MaterialReactTable table={table} />;
};
