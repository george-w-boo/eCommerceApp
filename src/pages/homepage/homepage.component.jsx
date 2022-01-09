import React from 'react';
import Directory from '../../components/directory/directory.component';
import { Link } from "react-router-dom";

import './homepage.styles.scss';

const HomePage = () => {

  return (
  <div className='homepage'>
    <Directory />
  </div>
)};

export default HomePage;
