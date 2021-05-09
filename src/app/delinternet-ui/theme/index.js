import * as React from 'react';

const ThemeContext = React.createContext(null);

export const ThemeProvider = props => {
  const [theme, setTheme] = React.useState(null);

  React.useEffect(() => {}, []);

  const value = React.useMemo(() => {
    return {
      theme,
      setTheme,
    };
  }, [theme]);

  return <ThemeContext.Provider value={value} {...props} />;
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be inside ThemeProvider');
  }

  return context;
};
