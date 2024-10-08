import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { IMember } from '../../schema/memberSchema';
import { Box, Link } from '@mui/material';
import { MockEmailCampaignList } from './MockEmailCampaignList';
import { IEmailCampaign } from '../../schema/emailCampaignSchema';
import { utcDateToAuDateTimeWithWeekday } from '../../utils/dateHelper';
import { CommonTableConfig } from '../components/CommonTableConfig';

export const EmailSearch = () => {
  const columns = useMemo<MRT_ColumnDef<IEmailCampaign>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'campaignName',
        header: 'Campaign name',
        grow: true,
      },
      {
        accessorKey: 'memberFilterDescription',
        header: 'Send to',
      },
      {
        accessorKey: 'subject',
        header: 'subject',
        grow: true,
      },
      {
        accessorKey: 'contentTemplate',
        header: 'Template',
      },
      {
        accessorKey: 'totalEmailSent',
        header: 'Total receivers count',
      },
      {
        accessorKey: 'sendBy',
        header: 'Sent by',
      },
      {
        accessorKey: 'sentDatetime',
        header: 'Send date',
        Cell: ({ renderedCellValue, row }) => (
          <span>
            {row.original.sendDatetime
              ? utcDateToAuDateTimeWithWeekday(row.original.sendDatetime)
              : ''}
          </span>
        ),
      },
    ],
    []
    //end
  );

  const table = useMaterialReactTable({
    ...CommonTableConfig,
    columns: columns,
    data: MockEmailCampaignList,
    getRowId: (row) => row.id,
    initialState: { showGlobalFilter: true },
    positionGlobalFilter: 'left',

    muiSearchTextFieldProps: {
      placeholder: `Search member`,
      sx: { minWidth: '300px' },
      variant: 'outlined',
    },
 
  });

  return <MaterialReactTable table={table} />;
};
