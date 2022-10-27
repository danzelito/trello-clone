import React from 'react';
import {CardContainer} from '../styles';

type CardProps = {
  text: string;
  id: string;
};

export const Card: React.FC<CardProps> = ({id, text}) => {
  return <CardContainer>{text}</CardContainer>;
};
