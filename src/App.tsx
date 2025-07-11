import './assets/styles/globals.scss';
import styles from './App.module.scss';
import { Routes } from './routes/Routes';
import { CartProvider } from './components/store';

const App = () => {
  return (
    <CartProvider>
      <div className={styles.firstdiv}>
        <Routes />
      </div>
    </CartProvider>
  );
};

export default App;