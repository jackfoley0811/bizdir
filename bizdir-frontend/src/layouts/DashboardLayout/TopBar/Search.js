import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Drawer,
  IconButton,
  SvgIcon,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Search as SearchIcon,
  XCircle as XIcon
} from 'react-feather';
const useStyles = makeStyles(() => ({
  drawer: {
    width: 500,
    maxWidth: '100%'
  }
}));

function Search() {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Tooltip title="Search">
        <IconButton
          color="inherit"
          onClick={handleOpen}
        >
          <SvgIcon fontSize="small">
            <SearchIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="right"
        classes={{ paper: classes.drawer }}
        ModalProps={{ BackdropProps: { invisible: true } }}
        onClose={handleClose}
        open={isOpen}
        variant="temporary"
      >
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <Box p={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h4"
                color="textPrimary"
              >
                Search
              </Typography>
              <IconButton onClick={handleClose}>
                <SvgIcon fontSize="small">
                  <XIcon />
                </SvgIcon>
              </IconButton>
            </Box>
          </Box>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
}

export default Search;
