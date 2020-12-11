import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Popover,
  TextField,
  Tooltip,
  Grid,
  FormControlLabel,
  Switch,
  makeStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SOURCE_LIST } from 'src/constants';

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

function MoreFilter({ updateCondition, keyLabel, sourceList, defaultCondition }) {
  const classes = useStyles();
  const ref = useRef(null);
  const [condition, setCondition] = useState(defaultCondition);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setCondition(defaultCondition);
  }, [defaultCondition]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateCondition(condition);
    setOpen(false);
  };

  const handleChange = (key, value) => {
    setCondition(oldCondition => ({
      ...oldCondition,
      [key]: value
    }))
  };

  return (
    <>
      <Tooltip title={keyLabel}>
        <Button variant="contained" color="primary" onClick={handleOpen} ref={ref} style={{ minWidth: 195, minHeight: 70, marginRight: "1rem" }}>
          {keyLabel}
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
        <Grid container>
          <Grid item xs={12}>
            <Box mt={0.5} p={1}>
              <Autocomplete
                options={sourceList?.map(item => item.title) || []}
                getOptionLabel={option => SOURCE_LIST[option]}
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
                value={condition?.source?.title}
                onChange={(event, newValue) => {
                  handleChange('source', sourceList.find(item => item.title == newValue))
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mt={0.5} p={1}>
              <TextField
                fullWidth
                label="County"
                name="county"
                onChange={(event) => handleChange('county', event.target.value)}
                value={condition?.county}
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mt={0.5} p={1}>
              <TextField
                fullWidth
                label="State"
                name="state"
                onChange={(event) => handleChange('state', event.target.value)}
                value={condition?.state}
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={0.5} p={1}>
              <TextField
                fullWidth
                label="Min Age"
                name="minAge"
                onChange={(event) => handleChange('minAge', event.target.value)}
                value={condition?.minAge}
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={0.5} p={1}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={condition?.internet === true}
                    edge="start"
                    name="direction"
                    onChange={(event) => handleChange('internet', event.target.checked)}
                  />
                )}
                label="Internet Only"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={0.5} p={1}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={condition?.lists_revenue === true}
                    edge="start"
                    name="direction"
                    onChange={(event) => handleChange('lists_revenue', event.target.checked)}
                  />
                )}
                label="Lists Revenue"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={0.5} p={1}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={condition?.lists_cashflow === true}
                    edge="start"
                    name="direction"
                    onChange={(event) => handleChange('lists_cashflow', event.target.checked)}
                  />
                )}
                label="Lists Cashflow"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={0.5} p={1}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={condition?.seller_financing === true}
                    edge="start"
                    name="direction"
                    onChange={(event) => handleChange('seller_financing', event.target.checked)}
                  />
                )}
                label="Seller Financing Available"
              />
            </Box>
          </Grid>
        </Grid>

      </Popover>
    </>
  );
}

export default MoreFilter;
