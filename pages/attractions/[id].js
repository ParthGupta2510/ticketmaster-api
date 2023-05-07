import { useRouter } from "next/router";
import axios from "axios";

function Attraction({ attraction }) {
  const router = useRouter();
  console.log(attraction);
  if (router.isFallback) {
    return <div>Loading attraction...</div>;
  }

  if (!attraction) {
    return <div>Attraction not found.</div>;
  }

  return (
    <div>
      <h1>{attraction.name}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  // Retrieve a list of all event IDs
  const response = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/attractions.json?size=200&countryCode=US&apikey=${process.env.API_KEY}`
  );

  const ids = response.data._embedded.attractions.map((attraction) => attraction.id);

  // Generate paths for all event IDs
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    // Retrieve event data for the specified ID
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/attractions/${params.id}.json?apikey=${process.env.API_KEY}`
    );

    const attraction = response.data;
    
    return { props: { attraction } };
  } catch (error) {
    console.log(error);

    return { props: {} };
  }
}

export default Attraction;
