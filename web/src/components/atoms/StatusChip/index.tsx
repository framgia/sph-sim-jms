import { ChipColors } from '@/utils/constants/statusChipColor';
import { Chip, ChipProps } from '@mui/material';
import { FC } from 'react';

const StatusChip: FC<ChipProps> = ({ label }: ChipProps) => {
  return (
    <Chip
      label={label}
      sx={{
        backgroundColor: ChipColors[label as string] ?? 'chip-default',
        typography: 'label1r'
      }}
    />
  );
};

export default StatusChip;
