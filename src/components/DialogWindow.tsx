import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addPassword,
  addUsername,
  changeLoginState,
  changeOpenState,
  openSelect,
  passwordSelect,
  usernameSelect,
} from '../redux/slices/AuthorizationSlice/slice';
import { rightUsername, rightPassword } from './Header';

import { useTranslation } from 'react-i18next';

const DialogWindow = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const username = useSelector(usernameSelect);
  const password = useSelector(passwordSelect);
  const open = useSelector(openSelect);

  const inputSetEmail = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addUsername(event.target.value));
  }, []);

  const inputSetPassword = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addPassword(event.target.value));
  }, []);

  const handleClose = React.useCallback(() => {
    dispatch(changeOpenState(false));
  }, []);

  const handleLogIn = React.useCallback(() => {
    if (username === rightUsername && password === rightPassword) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      navigate('/profile');
      dispatch(changeLoginState(true));
    } else {
      alert('username or password is incorrect');
    }
    dispatch(changeOpenState(false));
  }, []);
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">LogIn</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('dialogPage.message')}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label={t('dialogPage.userName')}
          type="username"
          fullWidth
          onChange={inputSetEmail}
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label={t('dialogPage.password')}
          type="password"
          fullWidth
          onChange={inputSetPassword}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t('dialogPage.cancel')}
        </Button>
        <Button onClick={handleLogIn} color="primary">
          {t('dialogPage.subscribe')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogWindow;
