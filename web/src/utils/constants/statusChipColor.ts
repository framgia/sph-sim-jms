export interface ChipProps {
  label: string;
}

export const ChipColors: Record<string, string> = {
  'Not yet Created': 'error.main',
  Making: 'warning.main',
  Approved: 'success.main',
  'Sent to Customer': 'info.main',
  Closed: 'chip-default'
};
