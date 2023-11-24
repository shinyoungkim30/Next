import { getFeaturedEvents } from '../data/dummy-data';

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <ul>The Home Page</ul>
    </div>
  );
};

export default HomePage;
