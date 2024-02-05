import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import theme from './theme';
import App from './App';

const queryClient = new QueryClient({
  // defaultOptions: {
  //  queries: {
  //    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  //  },
  // },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
