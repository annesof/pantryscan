import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

import { title as appTitle } from '@/config';

type MetaProps = {
  description?: string;
  meta?: Array<{ name: string; content: string }>;
  title?: string;
  image?: string;
  children?: ReactNode;
};

function Meta({ meta = [], title }: MetaProps) {
  const pageTitle = `${appTitle}${title ? ' | ' + title : ''}`;

  return (
    <Helmet
      title={pageTitle}
      meta={[
        {
          property: 'og:title',
          content: pageTitle,
        },

        {
          property: 'og:type',
          content: 'website',
        },

        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: pageTitle,
        },
      ].concat(meta)}
    />
  );
}

export default Meta;
