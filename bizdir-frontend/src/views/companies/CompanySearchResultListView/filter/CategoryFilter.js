import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Popover,
  TextField,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

function KeywordFilter({ updateCondition, keyValue, keyLabel, categoryList, defaultCondition }) {
  const classes = useStyles();
  const ref = useRef(null);
  const [category, setCategory] = useState(defaultCondition);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setCategory(defaultCondition);
  }, [defaultCondition]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateCondition(keyValue, category);
    setOpen(false);
  };

  const handleChange = (value) => {
    setCategory(value);
  };

  return (
    <>
      <Tooltip title={keyLabel}>
        <Button variant="contained" color="primary" onClick={handleOpen} ref={ref} style={{ minWidth: 195, minHeight: 70, marginRight: "1rem" }}>
          {keyLabel} <br />
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
          <Autocomplete
            multiple
            options={categoryList?.map(item => item.title) || []}
            renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
            value={category?.map(item => categoryList.find(one => one.id === item).title)}
            onChange={(event, newValue) => {
              console.log('category_filter', newValue)
              handleChange(newValue?.map(item => categoryList.find(one => one.title === item).id))
            }}
          />
        </Box>
      </Popover>
    </>
  );
}

export default KeywordFilter;
