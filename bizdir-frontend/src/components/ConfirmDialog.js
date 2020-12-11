import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  Typography,
  Grid,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  helperText: {
    textAlign: 'right',
    marginRight: 0
  }
}));

function ConfirmDialog({
  open,
  onClose,
  title,
  confirmText,
  onOk,
  condition,
  className,
  ...rest
}) {
  const classes = useStyles();
  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
    >
      <div
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Typography
          align="center"
          className={classes.title}
          gutterBottom
          variant="h3"
          color="textPrimary"
        >
          {title}
        </Typography>
        <Typography
          align="center"
          variant="subtitle2"
          color="textSecondary"
        >
          {confirmText}
        </Typography>
        <Box
          mt={3}
        // p={3}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                onClick={onOk}
                variant="contained"
                fullWidth
                color="primary"
              >
                Ok
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={onClose}
                variant="contained"
                fullWidth
                color="default"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  confirmText: PropTypes.string,
  onOk: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

ConfirmDialog.defaultProps = {
  onOk: () => { },
  onClose: () => { }
};

export default ConfirmDialog;
