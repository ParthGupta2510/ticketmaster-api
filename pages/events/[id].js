import { useRouter } from "next/router";
import axios from "axios";

function Event({ event }) {
  const router = useRouter();
  console.log(event);
  if (router.isFallback) {
    return <div>Loading event...</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.dates.start.localDate}</p>
      <p>{event.dates.start.localTime}</p>
      <p>{event._embedded.venues[0].name}</p>
    </div>
  );
}

export async function getStaticPaths() {
  // Retrieve a list of all event IDs
  const response = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?size=200&countryCode=US&apikey=${process.env.API_KEY}`
  );

  const ids = response.data._embedded.events.map((event) => event.id);

  // Generate paths for all event IDs
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    // Retrieve event data for the specified ID
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events/${params.id}.json?apikey=${process.env.API_KEY}`
    );

    const event = response.data;
    
    return { props: { event } };
  } catch (error) {
    console.log(error);

    return { props: {} };
  }
}

export default Event;
