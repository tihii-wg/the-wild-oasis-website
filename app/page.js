import Link from "next/link";
import Navigation from "./_components/Navigation";

export default function Home() {
  return (
    <div>
      <h1> The Wild Oasis. Welcome to paradice.</h1>

      <Link href="/cabins">Explore luxury cabins</Link>
    </div>
  );
}
