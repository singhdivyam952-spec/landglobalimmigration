import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Land Global Immigration',
  description = 'Premium immigration consultancy helping individuals and families achieve global mobility goals with expert visa and residency guidance.',
  path = '/',
  image = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
}) => {
  const fullTitle = title.includes('Land Global')
    ? title
    : `${title} | Land Global Immigration`;
  const url = `https://landglobalimmigration.com${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Land Global Immigration" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
