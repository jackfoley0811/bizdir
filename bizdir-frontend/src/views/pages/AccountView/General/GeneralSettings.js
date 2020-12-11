import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { editAccount } from 'src/actions/accountActions';


const useStyles = makeStyles(() => ({
  root: {}
}));

function GeneralSettings({ user, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        first_name: Yup.string().max(255).required('First name is required'),
        last_name: Yup.string().max(255).required('Last name is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          enqueueSnackbar('Upading Profile now', {
            variant: 'info'
          });
          const updatedUser = { ...user, ...values, password_old: values.password };
          delete updatedUser.password;
          await dispatch(editAccount(updatedUser, true));
          setStatus({ success: true });
          enqueueSnackbar('Profile updated', {
            variant: 'success'
          });
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.first_name && errors.first_name)}
                    fullWidth
                    helperText={touched.first_name && errors.first_name}
                    label="First Name"
                    name="first_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="first_name"
                    value={values.first_name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.last_name && errors.last_name)}
                    fullWidth
                    helperText={touched.last_name && errors.last_name}
                    label="Last Name"
                    name="last_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="last_name"
                    value={values.last_name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email ? errors.email : 'We will use this email to contact you'}
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
}

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
