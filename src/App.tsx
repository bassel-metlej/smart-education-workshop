import './assets/styles/globals.scss';
import styles from './App.module.scss';
import { Routes } from './routes/Routes';

const App = () => {
  return (
    <div className={styles.firstdiv}>
      <Routes />
    </div>
  );
};

export default App;