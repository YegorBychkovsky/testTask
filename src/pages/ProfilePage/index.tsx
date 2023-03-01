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
import { useDispatch } from 'react-redux';
import { changeLoginState } from '../../redux/slices/AuthorizationSlice/slice';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = localStorage.getItem('username');
  return (
    <div className={styles.profilePage}>
      <h1>{t('profilePage.h1')}</h1>

      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="350" image={img} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
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
              localStorage.removeItem('token');
              dispatch(changeLoginState(false));
              navigate('/testTask');
            }}>
            {t('profilePage.logOf')}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default ProfilePage;
