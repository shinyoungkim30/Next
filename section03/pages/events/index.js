import { Fragment } from 'react';

import { getAllEvents } from '@/data/dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { useRouter } from 'next/router';

const AllEventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;
