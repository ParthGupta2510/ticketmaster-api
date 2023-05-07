import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    padding: "10px",
    paddingTop: "0px",
  },
  heading: {
    textAlign: "center",
    fontSize: "3.5rem",
    margin: "20px 0px 40px",
  },
  eventContainer: {
    padding: "10px",
  },
  eventCard: {
    textAlign: "center",
    listStyleType: "none",
    margin: "0",
    padding: "0 20px",
    overflow: "hidden",
  },
  eventHeading: {
    fontSize: "1.5rem",
  },
  eventImg: {
    width: "100%",
  },
});

export default function Venues({ venues, totalPages }) {
  const router = useRouter();
  const { page } = router.query;
  console.log(venues);
  const classes = useStyles();

  const prevPage = parseInt(page) - 1;
  const nextPage = parseInt(page) + 1;

  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item xs={12}>
        <h1 className={classes.heading}>Venues Listing</h1>
      </Grid>
      <Grid item xs={12}>
        <ul>
          <Grid className={classes.eventContainer} container spacing={6}>
            {venues.map((venue) => (
              <Grid className={classes.eventCard} item xs={12}>
                <li key={venue.id}>
                  <div>
                    <h2 className={classes.eventHeading}>{venue.name}</h2>
                    <Grid container>
                      <Grid item xs={5}>
                        <img
                          className={classes.eventImg}
                          src={venue.images? venue.images[0].url: ""}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <p>City: {venue.city.name}</p>
                        <p>Country: {venue.country.name}</p>
                        <Link href={`/venues/${venue.id}`}>See Details</Link>
                      </Grid>
                    </Grid>
                  </div>
                </li>
              </Grid>
            ))}
          </Grid>
        </ul>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {prevPage > 0 && (
              <Link href={`/venues/page/${prevPage}`}>Previous Page</Link>
            )}
          </Grid>
          <Grid item xs={4}>
            <span>{`Page ${page}`}</span>
          </Grid>
          <Grid item xs={4}>
            {nextPage <= totalPages && (
              <Link href={`/venues/page/${nextPage}`}>Next Page</Link>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps({ params }) {
  const { page } = params;
  const API_KEY = process.env.API_KEY;

  const res = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/venues?apikey=${API_KEY}&countryCode=US&page=${page}`
  );

  const venues = res.data._embedded.venues;
  const totalPages = res.data.page.totalPages;

  return { props: { venues, totalPages } };
}
