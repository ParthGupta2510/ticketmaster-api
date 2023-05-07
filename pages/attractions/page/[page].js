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
  footer: {
    textAlign: "center",
    fontSize: "1.5rem",
    margin: "10px 0px 10px",
    padding: "10px 0 0",
  },
  links: {
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

export default function Events({ attractions, totalPages }) {
  const router = useRouter();
  const { page } = router.query;
  const classes = useStyles();

  const prevPage = parseInt(page) - 1;
  const nextPage = parseInt(page) + 1;

  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item xs={12}>
        <h1 className={classes.heading}>Attractions Listing</h1>
      </Grid>
      <Grid item xs={12}>
        <ul>
          <Grid className={classes.eventContainer} container spacing={6}>
            {attractions.map((attraction) => (
              <Grid className={classes.eventCard} item xs={12}>
                <li key={attraction.id}>
                  <div>
                    <h2 className={classes.eventHeading}>{attraction.name}</h2>
                    <Grid container>
                      <Grid item xs={5}>
                        <img
                          className={classes.eventImg}
                          src={attraction.images[0].url}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <p>Genre: {attraction.classifications[0].genre.name}</p>
                        <p>Number of Upcoming Events: {attraction.upcomingEvents._total}</p>
                        <Link href={`/attractions/${attraction.id}`} className={classes.links}>See Details</Link>
                      </Grid>
                    </Grid>
                  </div>
                </li>
              </Grid>
            ))}
          </Grid>
        </ul>
      </Grid>
      <Grid item xs={12} className={classes.footer}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {prevPage > 0 && (
              <Link href={`/attractions/page/${prevPage}`} className={classes.links}>Previous Page</Link>
            )}
          </Grid>
          <Grid item xs={4}>
            <span>{`Page ${page}`}</span>
          </Grid>
          <Grid item xs={4}>
            {nextPage <= totalPages && (
              <Link href={`/attractions/page/${nextPage}`} className={classes.links}>Next Page</Link>
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
    `https://app.ticketmaster.com/discovery/v2/attractions?apikey=${API_KEY}&countryCode=US&page=${page}`
  );
  console.log(res);
  const attractions = res.data._embedded.attractions;
  const totalPages = res.data.page.totalPages;

  return { props: { attractions, totalPages } };
}
