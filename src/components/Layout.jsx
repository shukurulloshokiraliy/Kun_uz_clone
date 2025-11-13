import { Outlet } from 'react-router-dom';
import Header from '../pages/Header/header';
import Footer from '../pages/Footer/index';

const Layout = () => {
  return (
    <div className='bg-[rgb(221,221,221)]'>
<div className="Container w-[1340px] m-auto ">
<Header />
      <main>
        <Outlet />
      </main>
      <Footer />
</div>
    </div>
  );
};

export default Layout;