import React from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Result, Button } from 'antd';

export const NoMatch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const backHome = () => {
    navigate('/');
  }

  if (!location?.from?.pathname) return <Navigate to="/" />

  return (
    <div className='page404'>
      <Result
        status='404'
        title='404'
        subTitle={`Страница ${location.from.pathname} не найдена`}
        extra={<Button onClick={backHome} type='primary'>Вернуться на главную</Button>}
      />
    </div>
  );
};
