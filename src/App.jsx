import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NotFound from './pages/404_Page';
import DetailPage from './pages/DetailPage';

const App = () => {
  return (
  
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Route>
      </Routes>
  
  );
};

export default App; 