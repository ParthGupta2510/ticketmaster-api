import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Ticketmaster API SPA!</h1>
      <p>Here you can discover your favorite events, attractions and venues!</p>
      <p>Check out our listings below:</p>
      <ul>
        <li><Link href="/events/page/1">Events</Link></li>
        <li><Link href="/attractions/page/1">Attractions</Link></li>
        <li><Link href="/venues/page/1">Venues</Link></li>
      </ul>
    </div>
  );
}