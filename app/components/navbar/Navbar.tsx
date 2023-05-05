'use client';

import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { SafeUser } from '@/app/types';
import Categories from './Categories';
import { useEffect, useState } from 'react';

interface NavbarProps {
  currentUser?: SafeUser | null;
}


const Navbar: React.FC<NavbarProps> = ({ 
  currentUser }) => {
    
const [show, setShow] = useState('translate-y-0');
const [lastScrollY, setLastScrollY] = useState(0);


const controlNavbar = () => {
  if (window.scrollY > 200) {
    if (window.scrollY > lastScrollY ) {
      setShow('-translate-y-[85px]');
    } else {
      setShow('shadow-sm');
    }
  } else {
    setShow('translate-y-0');
  }
  setLastScrollY(window.scrollY);
};

useEffect(() => {
  window.addEventListener('scroll', controlNavbar);
  return () => {
    window.removeEventListener('scroll', controlNavbar);
  };
}, [lastScrollY]);

  return (
    <div className={`fixed w-full bg-white z-10 shadow-sm transition-transform duration-300 ${show}`}>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className=' flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
