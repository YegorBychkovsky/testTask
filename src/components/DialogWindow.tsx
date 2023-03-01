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
  addFullName,
  addPassword,
  addUsername,
  changeLoginState,
  changeOpenState,
  fetchingLogin,
  fetchingRegister,
} from '../redux/slices/AuthorizationSlice/slice';
import { rightUsername, rightPassword } from './Header';

import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../redux/store';
import {
  usernameSelect,
  passwordSelect,
  fullNameSelect,
  openSelect,
} from '../redux/slices/AuthorizationSlice/exports';

const DialogWindow: React.FC = ({}) => {
  const navigate = useNavigate();

  const [openRegister, setOpenRegister] = React.useState(false);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const username = useSelector(usernameSelect);
  const password = useSelector(passwordSelect);
  const fullName = useSelector(fullNameSelect);
  const open = useSelector(openSelect);

  const inputSetEmail = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addUsername(event.target.value));
  }, []);

  const inputSetPassword = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addPassword(event.target.value));
  }, []);
  const inputSetFullName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addFullName(event.target.value));
  }, []);

  const handleCloseLogin = React.useCallback(() => {
    dispatch(changeOpenState(false));
  }, []);
  const handleCloseRegister = React.useCallback(() => {
    setOpenRegister(false);
  }, []);

  const handleOpenRegister = React.useCallback(() => {
    setOpenRegister(true);
    dispatch(changeOpenState(false));
  }, []);
  const handleOpenLogin = React.useCallback(() => {
    setOpenRegister(false);
    dispatch(changeOpenState(true));
  }, []);

  const handleRegister = React.useCallback(() => {
    if (username === rightUsername && password === rightPassword) {
      alert('Welcome dear, Admin!');
    }

    const email = username;
    appDispatch(fetchingRegister({ email, password, fullName }));

    setOpenRegister(false);
    dispatch(changeOpenState(false));
  }, [username, password]);

  const handleLogIn = React.useCallback(() => {
    if (username === rightUsername && password === rightPassword) {
      alert('Welcome dear, Admin!');
      localStorage.setItem('token', `token`);
      localStorage.setItem('username', `admin`);
      dispatch(changeLoginState(true));
    } else {
      const email = username;
      appDispatch(fetchingLogin({ email, password }));
    }
    dispatch(changeOpenState(false));
    navigate('/testTask/profile');
  }, [username, password]);
  return (
    <>
      {openRegister ? (
        <Dialog
          open={openRegister}
          onClose={handleCloseRegister}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
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
              id="fullName"
              label={t('dialogPage.fullName')}
              type="fullName"
              fullWidth
              onChange={inputSetFullName}
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
            <Button onClick={handleCloseRegister} color="primary">
              {t('dialogPage.cancel')}
            </Button>
            <Button onClick={handleRegister} color="primary">
              {t('dialogPage.register')}
            </Button>
            <Button onClick={handleOpenLogin} color="primary">
              {t('dialogPage.logIn')}
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={handleCloseLogin} aria-labelledby="form-dialog-title">
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
            <Button onClick={handleCloseLogin} color="primary">
              {t('dialogPage.cancel')}
            </Button>
            <Button onClick={handleLogIn} color="primary">
              {t('dialogPage.logIn')}
            </Button>
            <Button onClick={handleOpenRegister} color="primary">
              {t('dialogPage.register')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
export default DialogWindow;
