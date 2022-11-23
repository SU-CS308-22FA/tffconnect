import '../fake-db';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Store } from './redux/Store';
import routes from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const content = useRoutes(routes);

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
