import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

import { defaultMetaTags, title as appTitle } from '@/config';

type MetaProps = {
  description?: string;
  meta?: Array<{ name: string; content: string }>;
  title?: string;
  image?: string;
  children?: ReactNode;
};

function Meta({
  description = defaultMetaTags.description,
  meta = [],
  title,
  image = defaultMetaTags.image,
}: MetaProps) {
  const pageTitle = `${appTitle}${title ? ' | ' + title : ''}`;

  return (
    <Helmet
      title={pageTitle}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: pageTitle,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: image,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: pageTitle,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ].concat(meta)}
    />
  );
}

export default Meta;
