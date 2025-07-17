import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  FiHome, 
  FiUsers, 
  FiClock, 
  FiCode, 
  FiSettings, 
  FiBarChart,
  FiMapPin,
  FiCalendar
} from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const userNavItems = [
    {
      label: 'Tableau de bord',
      href: '/dashboard',
      icon: FiHome,
    },
    {
      label: 'Rejoindre une file',
      href: '/queue',
      icon: FiClock,
    },
    {
      label: 'Scanner QR',
      href: '/scanner',
      icon: FiCode,
    },
  ];

  const adminNavItems = [
    {
      label: 'Administration',
      href: '/admin',
      icon: FiBarChart,
    },
    {
      label: 'Départements',
      href: '/admin/departments',
      icon: FiMapPin,
    },
    {
      label: 'Statistiques',
      href: '/admin/stats',
      icon: FiBarChart,
    },
  ];

  const navItems = user?.role === 'admin' ? [...userNavItems, ...adminNavItems] : userNavItems;

  return (
    <aside className="hidden lg:block w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 