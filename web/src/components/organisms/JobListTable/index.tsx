import StatusChip from '@/components/atoms/StatusChip';
import { JobTableRow, TableColumn } from '@/utils/types/job';
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useHooks } from './hooks';

const JobListTable = (): JSX.Element => {
  const { columns, data } = useHooks();

  const renderTableCellContent = (
    column: TableColumn,
    row: JobTableRow
  ): JSX.Element => {
    switch (column.key) {
      case 'tags':
        return (
          <Stack
            sx={{
              gap: 0.5,
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
            useFlexGap>
            {row.tags.map((tag, key) => (
              <StatusChip key={key} label={tag} />
            ))}
          </Stack>
        );
      case 'schedules':
        return (
          <Stack
            sx={{
              gap: 0.5
            }}>
            {row.schedules.map((schedule, key) => (
              <Typography variant='label1r' key={key}>
                {schedule}
              </Typography>
            ))}
          </Stack>
        );
      case 'pipelinePhase':
        return <StatusChip label={row.pipelinePhase} />;
      case 'estimationStatus':
        return <StatusChip label={row.estimation.status} />;
      case 'cost':
        return <Typography variant='label1r'>{row.estimation.cost}</Typography>;
      default:
        return (
          <Typography variant='label1r'>{row[column.key] as string}</Typography>
        );
    }
  };

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
        <Paper elevation={0}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      component='th'
                      scope='row'
                      sx={{
                        minWidth: column.width,
                        backgroundColor: 'primary.500'
                      }}>
                      <Typography variant='label1b' color='white'>
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row: JobTableRow) => (
                  <TableRow key={row.id}>
                    {columns.map((column: TableColumn, index) => (
                      <TableCell key={index}>
                        {renderTableCellContent(column, row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default JobListTable;
