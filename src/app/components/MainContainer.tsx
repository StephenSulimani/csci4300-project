import { ReactNode } from 'react';
import styles from './MainContainer.module.css';

interface MainContainerProps {
    className?: string; // Optional additional CSS classes
    children: ReactNode; // Content inside the card
  }

const MainContainer: React.FC<MainContainerProps> = ({ className = '', children }) => {
  const classes = `${styles['main-container']} ${className}`; // Combine card class with additional classes

  return <div className={classes}>{children}</div>;
};
export default MainContainer;