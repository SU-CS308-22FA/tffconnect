import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Store } from './redux/Store';
import routes from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useSearchParams } from 'react-router-dom';
import { setSession } from 'app/contexts/JWTAuthContext';

const App = () => {
  const content = useRoutes(routes);

  let [searchParams, setSearchParams] = useSearchParams();

  /* if there is a token in the url, set it in the local storage */
  if (searchParams.get('token')) {
    setSession(searchParams.get('token'));
    setSearchParams({ token: null });
  }

  return (
    <GoogleOAuthProvider clientId="572073356513-hg6p2ohk4s3ktohnnd6moi9sfgfmm73d.apps.googleusercontent.com">
      <Provider store={Store}>
        <SettingsProvider>
          <MatxTheme>
            <AuthProvider>{content}</AuthProvider>
          </MatxTheme>
        </SettingsProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
