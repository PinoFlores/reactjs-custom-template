import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { GlobalStyle } from 'styles/global-styles';

import Base from '@pages/Layout/Base';
import { useTranslation } from 'react-i18next';
import { NotFoundPage } from '@components/NotFoundPage';
import Login from './pages/login';
import Favicon from '../app/Assets/Favicon.png';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './delinternet-ui/theme/theme';
import { GlobalStyles } from 'app/delinternet-ui/theme/globalStyles';
import { connect } from 'react-redux';

import './App.less';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 3000),
    },
  },
});

function App(props) {
  const { i18n } = useTranslation();

  React.useEffect(() => {}, []);

  return (
    <ThemeProvider theme={props.theme === 'light' ? lightTheme : darkTheme}>
      <>
        <Toaster position="bottom-right" reverseOrder={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Helmet
            titleTemplate="%s - App"
            defaultTitle="App"
            htmlAttributes={{ lang: i18n.language }}
          >
            <link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
            <meta name="description" content="App application" />
          </Helmet>
          <QueryClientProvider client={queryClient}>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Base />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
            <GlobalStyle />
          </QueryClientProvider>
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

const mapStateToProps = ({ ThemeReducer }) => {
  const { theme } = ThemeReducer;
  return { theme };
};

export default connect(mapStateToProps, {})(App);
