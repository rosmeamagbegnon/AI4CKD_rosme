import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStethoscope } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi'; // Icônes pour le menu

const NavbarConn = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false); // État pour le menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Ferme le menu
  };

  return (
    <nav className='flex justify-between items-center px-4 lg:px-8 xl:px-12 py-3 shadow-lg bg-slate-50'>
      <div className='flex items-center gap-2 text-blue-500'>
        <FaStethoscope />
        <h1 className='text-2xl font-extrabold'>MRC</h1>
      </div>

      <div className='flex md:hidden'>
        <button onClick={toggleMenu} className='text-2xl'>
          {isOpen ? <HiX className='text-blue-500 font-bold' /> : <HiMenu className='text-blue-500 font-bold' />}
        </button>
      </div>

      <ul className={`flex-col md:flex md:flex-row md:items-center md:space-x-8 absolute md:static bg-slate-50 w-md md:w-auto transition-transform duration-300 ${isOpen ? 'top-16 right-0 px-4 h-full pt-4 space-y-4' : 'top-[-200px] px-0 h-auto pt-0 space-y-0'} md:top-0`}>
        <li className='text-lg font-medium'>
          <Link to="/" onClick={handleLinkClick}>Liste des patients</Link>
        </li>
        <li className='text-lg font-medium'>
          <Link to="/archives" onClick={handleLinkClick}>Archives</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <button onClick={() => { onLogout(); handleLinkClick(); }}>Déconnexion</button>
          </li>
        ) : (
          <li className='bg-blue-500 text-center text-white px-3 py-1 rounded font-medium'>
            <Link to="/login" onClick={handleLinkClick}>Se Connecter</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavbarConn;
