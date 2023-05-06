import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Events({ events }) {
  const router = useRouter();
  const { page } = router.query;

  const prevPage = parseInt(page) - 1;
  const nextPage = parseInt(page) + 1;

  return (
    <div>
      <h1>Events Listing</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`/events/${event.id}`}>{event.name}</Link>
          </li>
        ))}
      </ul>
      <div>
        {prevPage > 0 && (
          <Link href={`/events/page/${prevPage}`}>Previous Page</Link>
        )}
        <span>{`Page ${page}`}</span>
        {nextPage <= Math.ceil(events.total / events.size) && (
          <Link href={`/events/page/${nextPage}`}>Next Page</Link>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const page = params.page || 1;
  const API_KEY = process.env.TM_API_KEY;

  const res = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/events?apikey=${API_KEY}&countryCode=US&page=${page}`
  );
  const events = res.data._embedded.events;

  return { props: { events } };
}
