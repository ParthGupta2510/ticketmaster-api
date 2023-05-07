import { useRouter } from "next/router";
import axios from "axios";

function Venue({ venue }) {
  const router = useRouter();
  console.log(venue);
  if (router.isFallback) {
    return <div>Loading venue...</div>;
  }

  if (!venue) {
    return <div>Venue not found.</div>;
  }

  return (
    <div>
      <h1>{venue.name}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  // Retrieve a list of all event IDs
  const response = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/venues.json?size=200&countryCode=US&apikey=${process.env.API_KEY}`
  );

  const ids = response.data._embedded.venues.map((venue) => venue.id);

  // Generate paths for all event IDs
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    // Retrieve event data for the specified ID
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/venues/${params.id}.json?apikey=${process.env.API_KEY}`
    );

    const venue = response.data;
    
    return { props: { venue } };
  } catch (error) {
    console.log(error);

    return { props: {} };
  }
}

export default Venue;
