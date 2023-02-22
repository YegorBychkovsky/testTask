import React from 'react';
import styles from './Header.module.scss';
import Box from '@mui/material/Box';
import img from '../../assets/imgs/news-4301.png';
import { BottomNavigation, BottomNavigationAction, Button, Stack } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

import LoginIcon from '@mui/icons-material/Login';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HomeIcon from '@mui/icons-material/Home';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addValue,
  changeLoginState,
  changeOpenState,
  loginSelect,
  valueSelect,
} from '../../redux/slices/AuthorizationSlice/slice';
import DialogWindow from '../DialogWindow';

import { useTranslation } from 'react-i18next';
import { changeLanguage, languageSelect } from '../../redux/slices/HeaderSlice';

export const rightUsername = 'username';
export const rightPassword = '12345';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const language = useSelector(languageSelect);
  const login = useSelector(loginSelect);
  const value = useSelector(valueSelect);

  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  const { t, i18n } = useTranslation();

  const changeLanguageOfSite = React.useCallback((language: string) => {
    i18n.changeLanguage(language);
    dispatch(changeLanguage(language));
  }, []);

  const handleClickOpen = React.useCallback(() => {
    dispatch(changeOpenState(true));
  }, []);

  React.useEffect(() => {
    username === rightUsername && password === rightPassword
      ? dispatch(changeLoginState(true))
      : dispatch(changeLoginState(false));
    console.log(login);
  }, [username, password]);

  return (
    <Box
      className={styles.header}
      sx={{
        width: '100%',
        backgroundColor: 'primary.dark',
      }}>
      <div className={styles.logoBlock}>
        <img width={80} src={img} alt="" />
        <h1>{t('siteName')}</h1>
      </div>
      <BottomNavigation
        showLabels
        className={styles.navBlock}
        value={value}
        onChange={(event, newValue) => {
          dispatch(addValue(newValue));
        }}>
        {login ? (
          <BottomNavigationAction
            label={t('profile')}
            onClick={() => navigate('/profile')}
            icon={<PermIdentityIcon />}
          />
        ) : (
          <BottomNavigationAction
            label={t('logIn')}
            onClick={handleClickOpen}
            icon={<LoginIcon />}
          />
        )}

        {login ? (
          <BottomNavigationAction
            label={t('news')}
            onClick={() => navigate('/news')}
            icon={<ArticleIcon />}
          />
        ) : (
          <BottomNavigationAction
            label={t('news')}
            onClick={() => alert('You are not logIn')}
            icon={<ArticleIcon />}
          />
        )}

        <BottomNavigationAction
          label={t('home')}
          onClick={() => navigate('')}
          icon={<HomeIcon />}
        />
      </BottomNavigation>
      <DialogWindow />
      <Stack sx={{ marginLeft: '50px' }} spacing={2} direction="row">
        {language === 'en' ? (
          <Button
            onClick={() => {
              changeLanguageOfSite('ua');
            }}
            sx={{ bgcolor: 'white', color: 'black' }}
            variant="contained">
            UA
          </Button>
        ) : (
          <Button
            onClick={() => {
              changeLanguageOfSite('en');
            }}
            sx={{ bgcolor: 'white', color: 'black' }}
            variant="contained">
            EN
          </Button>
        )}
      </Stack>
    </Box>
  );
};
export default Header;
