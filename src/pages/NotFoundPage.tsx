import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Section from '../components/ui/Section';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Non Trouvée | SCI BIBA IMMO INGENIERING</title>
      </Helmet>

      <div className="pt-24">
        <Section className="py-20">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-primary-800 mb-6">Oups !</h1>
            <p className="text-xl text-gray-600 mb-8">
              La page que vous recherchez semble avoir été déplacée ou n'existe pas.
            </p>
            <Link to="/" className="btn-primary">
              Retour à l'accueil
            </Link>
          </div>
        </Section>
      </div>
    </>
  );
};

export default NotFoundPage;