import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import React from 'react';
import styles from './NewsPage.module.scss';
import img from '../../assets/imgs/Breaking-News.webp';

import { useDispatch, useSelector } from 'react-redux';
import {
  latestNewsResultsSelect,
  latestNewsSelect,
  deleteItem,
  fetchingLatestNews,
} from '../../redux/slices/NewsPageSlice/slice';
import { useAppDispatch } from '../../redux/store';
import { languageSelect } from '../../redux/slices/HeaderSlice';

import { useTranslation } from 'react-i18next';

const NewsPage = () => {
  const dispatch = useAppDispatch();
  const dsptch = useDispatch();

  const { t } = useTranslation();

  const language = useSelector(languageSelect);
  const results = useSelector(latestNewsResultsSelect);
  const news = useSelector(latestNewsSelect);

  let url = '';
  language === 'en' ? (url = 'news?country=us') : (url = 'news?country=ua');

  React.useEffect(() => {
    dispatch(fetchingLatestNews({ url }));
  }, [language]);

  const downloadMoreNews = React.useCallback((url: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(fetchingLatestNews({ url }));
  }, []);

  const deleteItemFunction = React.useCallback((i: number) => {
    dsptch(deleteItem(i));
  }, []);

  return (
    <div className={styles.newsPage}>
      <div className={styles.newsContainer}>
        {results?.map((item, i) => (
          <Card className={styles.card} key={i} sx={{ maxWidth: 500 }}>
            <CardMedia component="img" height="140" image={item.image_url ? item.image_url : img} />
            <CardContent>
              <Typography
                sx={{ height: 120, overflow: 'hidden' }}
                gutterBottom
                variant="h5"
                component="div">
                {item.title}
              </Typography>
              <Typography
                sx={{ maxHeight: 102, overflow: 'hidden' }}
                variant="body2"
                color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardActions className={styles.links}>
              <Button size="small">Share</Button>
              <Button
                size="small"
                onClick={() => {
                  deleteItemFunction(i);
                  console.log(results);
                }}>
                Delete
              </Button>
              <Button size="small">
                <a href={item.link}>Learn More</a>
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <Button
        className={styles.downloadMoreButton}
        variant="contained"
        disableElevation
        onClick={() => {
          downloadMoreNews(url + `&page=${news?.nextPage}`);
        }}>
        {t('newsPage.nextButton')}
      </Button>
    </div>
  );
};
export default NewsPage;
