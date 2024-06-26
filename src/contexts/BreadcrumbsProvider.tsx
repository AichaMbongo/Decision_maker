import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Breadcrumb {
  path: string;
  label: string;
}

interface BreadcrumbsContextType {
  breadcrumbs: Breadcrumb[];
  handleNavigation: (path: string, label: string) => void;
  updateBreadcrumbs: (path: string) => void;
  handleBackNavigation: () => void;
  resetBreadcrumbs: () => void;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextType | undefined>(undefined);

export const useBreadcrumbs = (): BreadcrumbsContextType => {
  const context = useContext(BreadcrumbsContext);
  if (!context) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider');
  }
  return context;
};

const BreadcrumbsProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>(() => {
    // Load breadcrumbs from local storage on initial state setup
    const savedBreadcrumbs = localStorage.getItem('breadcrumbs');
    if (savedBreadcrumbs) {
      const parsedBreadcrumbs = JSON.parse(savedBreadcrumbs);
      // Ensure the landing page breadcrumb is included
      if (!parsedBreadcrumbs.find((crumb: Breadcrumb) => crumb.path === '/')) {
        return [{ path: '/', label: 'Home' }, ...parsedBreadcrumbs];
      }
      return parsedBreadcrumbs;
    }
    // Initialize with the landing page breadcrumb if none are saved
    return [{ path: '/', label: 'Home' }];
  });

  const navigate = useNavigate();

  // Save breadcrumbs to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs));
  }, [breadcrumbs]);

  const handleNavigation = (path: string, label: string) => {
    setBreadcrumbs((prevBreadcrumbs) => {
      const existingIndex = prevBreadcrumbs.findIndex((crumb) => crumb.path === path);
      if (existingIndex !== -1) {
        return prevBreadcrumbs.slice(0, existingIndex + 1);
      } else {
        return [...prevBreadcrumbs, { path, label }];
      }
    });
    navigate(path);
  };

  const updateBreadcrumbs = (path: string) => {
    setBreadcrumbs((prevBreadcrumbs) => {
      const existingIndex = prevBreadcrumbs.findIndex((crumb) => crumb.path === path);
      if (existingIndex !== -1) {
        return prevBreadcrumbs.slice(0, existingIndex + 1);
      }
      return prevBreadcrumbs;
    });
  };

  const handleBackNavigation = () => {
    setBreadcrumbs((prevBreadcrumbs) => {
      if (prevBreadcrumbs.length > 1) {
        const newBreadcrumbs = prevBreadcrumbs.slice(0, -1);
        const lastBreadcrumb = newBreadcrumbs[newBreadcrumbs.length - 1];
        navigate(lastBreadcrumb.path);
        return newBreadcrumbs;
      }
      return prevBreadcrumbs;
    });
  };

  const resetBreadcrumbs = () => {
    setBreadcrumbs([{ path: '/', label: 'Home' }]);
  };

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs, handleNavigation, updateBreadcrumbs, handleBackNavigation, resetBreadcrumbs }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export default BreadcrumbsProvider;
