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

function NumberFilter({ updateCondition, keyValue, keyLabel, defaultCondition, isPrice = false }) {
  const classes = useStyles();
  const ref = useRef(null);
  const [values, setValues] = useState(defaultCondition);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setValues(oldValues => ({
      ...defaultCondition
    }));
  }, [defaultCondition]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateCondition(keyValue, values);
    setOpen(false);
  };
  const onClickDefault = (value) => {
    setValues(oldValues => ({
      ...oldValues,
      ...value
    }));
    updateCondition(keyValue, value);
    setOpen(false);
  }
  const handleChange = (field, value) => {
    setValues(values => ({
      ...values,
      [field]: parseFloat(value)
    }));
  };

  const handleSave = () => {
    // saveSettings(values);
    // setOpen(false);
  };
  let priceText = '';
  if (parseFloat(values?.max) >= 0 && parseFloat(values?.min) >= 0) {
    priceText = `${isPrice ? '$' : ''}${convertNumberFormat(values.min)} - ${isPrice ? '$' : ''}${convertNumberFormat(values.max)}`;
  }
  else if (parseFloat(values?.max) >= 0) {
    priceText = `-${isPrice ? '$' : ''}${convertNumberFormat(values.max)}`;
  }
  else if (parseFloat(values?.min) >= 0) {
    priceText = `${isPrice ? '$' : ''}${convertNumberFormat(values.min)}+`;
  }
  if(values?.max === '' && values?.min === '') {
    priceText = '';
  }
  return (
    <>
      <Tooltip title={keyLabel}>
        <Button variant="contained" color="primary" onClick={handleOpen} ref={ref} style={{ minWidth: 195, minHeight: 70, marginRight: "1rem" }}>
          {keyLabel} <br />
          {priceText}
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
          <Grid item xs={6}>
            <Box mt={2} p={1}>
              <TextField
                fullWidth
                label="Min"
                name="min"
                onChange={(event) => handleChange('min', event.target.value)}
                value={values?.min}
                variant="outlined"
                type="number"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mt={2} p={1}>
              <TextField
                fullWidth
                label="Max"
                name="max"
                onChange={(event) => handleChange('max', event.target.value)}
                value={values?.max}
                variant="outlined"
                type="number"
              />
            </Box>
          </Grid>
        </Grid>
        {isPrice &&
          <Table>
            <TableBody>
              <TableRow hover onClick={() => onClickDefault({ min: 0 })}>
                <TableCell>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    0+
                </Typography>
                </TableCell>
              </TableRow>
              <TableRow hover onClick={() => onClickDefault({ min: 50000 })}>
                <TableCell>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    $50,000+
                </Typography>
                </TableCell>
              </TableRow>
              <TableRow hover onClick={() => onClickDefault({ min: 100000 })}>
                <TableCell>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    $100,000+
                </Typography>
                </TableCell>
              </TableRow>
              <TableRow hover onClick={() => onClickDefault({ min: 250000 })}>
                <TableCell>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    $250,000+
                </Typography>
                </TableCell>
              </TableRow>
              <TableRow hover onClick={() => onClickDefault({ min: 500000 })}>
                <TableCell>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    $500,000+
                </Typography>
                </TableCell>
              </TableRow>
              <TableRow hover onClick={() => onClickDefault({ min: 1000000 })}>
                <TableCell>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    $1,000,000+
                </Typography>
                </TableCell>
              </TableRow>
              <TableRow hover onClick={() => onClickDefault({ min: 1500000 })}>
                <TableCell>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    $1,500,000+
                </Typography>
                </TableCell>
              </TableRow>
              <TableRow hover onClick={() => onClickDefault({ min: 2000000 })}>
                <TableCell>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                  >
                    $2,000,000+
                </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        }
        <Box mt={2}>
          {/* <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSave}
          >
            Save Settings
          </Button> */}
        </Box>
      </Popover>
    </>
  );
}

export default NumberFilter;
