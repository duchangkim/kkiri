import React from 'react';
import LeftMain from '../../components/Main/LeftMain';

const LeftMainContainer = () => {
  const weathers = {
    place: '우리집',
    description: 'description',
    temperature: '100C',
    place2: '느그집',
    temperature2: '100C',
  };
  return <LeftMain weathers={weathers} />;
};

export default LeftMainContainer;
