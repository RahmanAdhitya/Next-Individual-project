import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Navbar from '../component/Navbar';
import AuthProvider from '../component/authProvider';
import NetworkMessageWrapper from '../component/NetworkMesaageWrapper';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        {/* <NetworkMessageWrapper> */}
        {/* <AuthProvider> */}
        <Navbar />
        <Component {...pageProps} />
        {/* </AuthProvider> */}
        {/* </NetworkMessageWrapper> */}
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
