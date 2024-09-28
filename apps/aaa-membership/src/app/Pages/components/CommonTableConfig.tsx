import { Box } from '@mui/material';
import { MRT_DensityState } from 'material-react-table';

export const CommonTableConfig = {
  enableColumnOrdering: true,

  enableColumnActions: false,
  enableColumnResizing: true,
  enableColumnDragging: false,

  initialState: {
    showColumnFilters: false,
    density: 'compact' as MRT_DensityState,
  },
  defaultDisplayColumn: { enableResizing: true },
  enableColumnFilters: false,
  manualFiltering: true,
  manualPagination: true,
  manualSorting: true,

  muiPaginationProps: {
    rowsPerPageOptions: [10, 20, 50], //todo remove 10 later as 20 is ok, and can reduce lots api requests
  },
  renderEmptyRowsFallback: () => (
    <Box m={2}>
      <Box>No matching result could be found.</Box>
    </Box>
  ),
};
