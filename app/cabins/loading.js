import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="grid justify-center items-center">
      <Spinner />

      <p className="text-xl text-primary-200">Loading cabins data...</p>
    </div>
  );
}
