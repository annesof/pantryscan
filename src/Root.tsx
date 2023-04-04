import { ApolloClient, ApolloProvider, gql, InMemoryCache } from '@apollo/client';
import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';

import ThemeProvider from '@/theme/Provider';

const typeDefs = gql`
  extend input FetchProductsArgs {
    categories: String
    location: String
    skip: Int = 0
    sortBy: String = "NAME"
    take: Int = 10
    withFoods: Boolean = false
    userId: Int = 1
  }
`;

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  typeDefs,
  /*headers: {
    Authorization: authToken ? `Bearer ${authToken}` : '',
  },*/
});

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <RecoilRoot>
        <HelmetProvider>
          <ApolloProvider client={client}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ApolloProvider>
        </HelmetProvider>
      </RecoilRoot>
    </StrictMode>,
  );
}

export default render;
