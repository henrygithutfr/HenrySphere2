import { Helmet } from "react-helmet-async";

const MetaTagHelmet = ({ title, description, author, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="keywords" content={keyword} />
    </Helmet>
  );
};

export default MetaTagHelmet;
