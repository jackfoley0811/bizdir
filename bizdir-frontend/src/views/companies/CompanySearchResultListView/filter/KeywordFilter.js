import React, { useState, useRef, useEffect } from 'react';
import { capitalCase } from 'change-case';
import {
  Badge,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Popover,
  SvgIcon,
  Switch,
  TextField,
  Tooltip,
  Typography,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  makeStyles
} from '@material-ui/core';
import { Settings as SettingsIcon } from 'react-feather';
import useSettings from 'src/hooks/useSettings';
import { THEMES } from 'src/constants';
import { convertNumberFormat } from 'src/utils/number';

const useStyles = makeStyles((theme) => ({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5
  },
  popover: {
    width: 320,
    padding: theme.spacing(2)
  }
}));

function KeywordFilter({ updateCondition, keyValue, keyLabel, defaultCondition }) {
  const classes = useStyles();
  const ref = useRef(null);
  const [keyword, setKeyword] = useState(defaultCondition);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setKeyword(defaultCondition);
  }, [defaultCondition]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateCondition(keyValue, keyword);
    setOpen(false);
  };

  const handleChange = (value) => {
    setKeyword(value);
  };

  return (
    <>
      <Tooltip title={keyLabel}>
        <Button variant="contained" color="primary" onClick={handleOpen} ref={ref} style={{ minWidth: 195, minHeight: 70, marginRight: "1rem" }}>
          {keyLabel} <br />
          {keyword}
        </Button>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Box mt={2} p={1}>
          <TextField
            fullWidth
            label="Keyword"
            name="keyword"
            onChange={(event) => handleChange(event.target.value)}
            value={keyword}
            variant="outlined"
          />
        </Box>
      </Popover>
    </>
  );
}

export default KeywordFilter;
