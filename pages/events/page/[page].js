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
  links: {
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

export default function Events({ events, totalPages }) {
  const router = useRouter();
  const { page } = router.query;
  console.log(events);
  const classes = useStyles();

  const prevPage = parseInt(page) - 1;
  const nextPage = parseInt(page) + 1;

  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item xs={12}>
        <h1 className={classes.heading}>Events Listing</h1>
      </Grid>
      <Grid item xs={12}>
        <ul>
          <Grid className={classes.eventContainer} container spacing={6}>
            {events.map((event) => (
              <Grid className={classes.eventCard} item xs={12}>
                <li key={event.id}>
                  <div>
                    <h2 className={classes.eventHeading}>{event.name}</h2>
                    <Grid container>
                      <Grid item xs={5}>
                        <img
                          className={classes.eventImg}
                          src={event.images[0].url}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <p>Event Date: {event.dates.start.localDate}</p>
                        <p>Event Time: {event.dates.start.localTime}</p>
                        <Link href={`/events/${event.id}`} className={classes.links}>See Details</Link>
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
              <Link href={`/events/page/${prevPage}`} className={classes.links}>Previous Page</Link>
            )}
          </Grid>
          <Grid item xs={4}>
            <span>{`Page ${page}`}</span>
          </Grid>
          <Grid item xs={4}>
            {nextPage <= totalPages && (
              <Link href={`/events/page/${nextPage}`} className={classes.links}>Next Page</Link>
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
    `https://app.ticketmaster.com/discovery/v2/events?apikey=${API_KEY}&countryCode=US&page=${page}`
  );

  const events = res.data._embedded.events;
  const totalPages = res.data.page.totalPages;

  return { props: { events, totalPages } };
}
