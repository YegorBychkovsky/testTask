import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import styles from './ProfilePage.module.scss';
import img from '../../assets/imgs/profile_pic.png';
import { useSelector } from 'react-redux';
import { usernameSelect } from '../../redux/slices/AuthorizationSlice/slice';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const username = useSelector(usernameSelect);
  return (
    <div className={styles.profilePage}>
      <h1>{t('profilePage.h1')}</h1>

      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="350" image={img} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('profilePage.about')}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            sx={{ textTransform: 'none' }}
            size="large"
            color="primary"
            onClick={() => {
              localStorage.removeItem('username');
              localStorage.removeItem('password');
              console.log(window.localStorage);
              navigate('/');
            }}>
            {t('profilePage.logOf')}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default ProfilePage;
