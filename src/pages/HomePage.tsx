import { Helmet } from 'react-helmet';
import Hero from '../components/home/Hero';
import Mission from '../components/home/Mission';
import ProgramsPreview from '../components/home/ProgramsPreview';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import GroupBuyingFeatures from '../components/home/GroupBuyingFeatures';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>SCI BIBA IMMO INGENIERING - Achat Groupé de Terrains</title>
        <meta name="description" content="Découvrez les programmes d'achat groupé de terrains par SCI BIBA IMMO INGENIERING et rejoignez une communauté écologique et solidaire." />
      </Helmet>

      <Hero />
      <Mission />
      <GroupBuyingFeatures />
      {/* <ProgramsPreview /> */}
      <Testimonials />
      {/* <CallToAction /> */}
    </>
  );
};

export default HomePage;