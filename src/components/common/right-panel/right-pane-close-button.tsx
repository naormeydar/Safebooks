import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  onClick: () => void;
};

export const RightPaneCloseButton = ({ onClick }: Props) => (
  <IconButton onClick={onClick}>
    <CloseIcon sx={{ fontSize: '14px' }} />
  </IconButton>
);
