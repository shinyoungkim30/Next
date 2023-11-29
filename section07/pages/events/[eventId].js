import EventContent from '@/components/event-detail/event-content';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import { getEventById, getFeaturedEvents } from '@/helpers/api-util';
import Head from 'next/head';
import { Fragment } from 'react';

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return { props: { selectedEvent: event }, revalidate: 30 };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  // fallback을 true로 설정할 경우
  // featuredEvents가 아닌 페이지를 발견하면 Next.js에서 동적으로 페이지 생성
  return { paths: paths, fallback: true };
};

export default EventDetailPage;