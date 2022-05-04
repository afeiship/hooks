import React from 'react';
import { useFetch } from '@/lib/use-fetch';

export const D1 = (props) => {
  const res = useFetch('https://api.github.com/users/afeiship');
  console.log('res: ', res);
  return <button {...props}>Hi</button>;
};
