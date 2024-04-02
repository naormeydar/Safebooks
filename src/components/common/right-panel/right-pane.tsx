import { Box, Drawer } from '@mui/material';
import { useRightPane } from './context';
import { FC, useEffect } from 'react';
import { RightPaneCloseButton } from './right-pane-close-button';

export const RightPane: FC = () => {
  const { close, width, Component, isOpen } = useRightPane();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const drawer = document.getElementById('drawer');
      if (drawer && !drawer.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Drawer
      id='drawer'
      anchor='right'
      open={isOpen}
      onClose={close}
      variant='persistent'
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          border: 'none',
          filter: 'drop-shadow(0px 20px 40px rgba(172, 177, 182, 0.30))',
          overflow: 'visible',
        },
      }}
    >
      <Box>
        <RightPaneCloseButton onClick={close} />
      </Box>
      {Component}
    </Drawer>
  );
};
