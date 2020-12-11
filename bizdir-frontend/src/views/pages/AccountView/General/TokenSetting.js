import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

import {
  regenerateToken
} from 'src/actions/accountActions';
const useStyles = makeStyles(() => ({
  root: {}
}));

function TokenSetting({ user, newToken, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const onRegenrateToken = async () => {
    enqueueSnackbar('Regenerating token  now...', {
      variant: 'info'
    });
    await dispatch(regenerateToken(user.id))
    localStorage.setItem('accessToken', newToken.key)
    enqueueSnackbar('Token has been regenerated successfully', {
      variant: 'success'
    });
  }
  useEffect(() => {
    if(newToken) {
      setToken(newToken.key);
      localStorage.setItem('accessToken', newToken.key);
    }
  },[newToken])
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Token" />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={9}
            xs={12}
          >
            <TextField size="small" fullWidth variant="outlined" value={token} />
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
          >
            <Button
              variant="outlined"
              color="primary" 
              onClick={onRegenrateToken}
              fullWidth
            >
              Regenerate
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

TokenSetting.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default TokenSetting;
