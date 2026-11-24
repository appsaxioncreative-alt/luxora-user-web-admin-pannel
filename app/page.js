import Link from "next/link";
// Replace this with the real public website. The admin lives at /admin.
export default function Home() {
  return <main style={{ padding: 48 }}><h1>Luxora Makers</h1><p>Public site goes here. <Link href="/admin">Admin</Link></p></main>;
}
