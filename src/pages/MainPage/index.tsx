import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import React from 'react';
import styles from './MainPage.module.scss';

import LoginIcon from '@mui/icons-material/Login';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import { useDispatch, useSelector } from 'react-redux';
import { addValue, changeOpenState } from '../../redux/slices/AuthorizationSlice/slice';
import DialogWindow from '../../components/DialogWindow';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { valueSelect } from '../../redux/slices/AuthorizationSlice/exports';

const MainPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const value = useSelector(valueSelect);

  const handleClickOpen = React.useCallback(() => {
    dispatch(changeOpenState(true));
  }, []);

  return (
    <div>
      <Box
        className={styles.container}
        sx={{
          width: 500,
          height: 350,
          backgroundColor: 'primary.dark',
        }}>
        <h2>
          {t('mainPage.h2top')} <br />
          <br />
          <span>{t('mainPage.h2middle')}</span> <br />
          <br />
          {t('mainPage.h2bottom')}
        </h2>
        <BottomNavigation
          showLabels
          className={styles.navBlock}
          value={value}
          onChange={(event, newValue) => {
            dispatch(addValue(newValue));
          }}>
          {token ? (
            <BottomNavigationAction
              label={t('profile')}
              onClick={() => navigate('/testTask/profile')}
              icon={<PermIdentityIcon />}
            />
          ) : (
            <BottomNavigationAction
              label={t('logIn')}
              onClick={handleClickOpen}
              icon={<LoginIcon />}
            />
          )}
        </BottomNavigation>
      </Box>
      <DialogWindow />
    </div>
  );
};
export default MainPage;
