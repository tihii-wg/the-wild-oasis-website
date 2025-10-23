"use client";

import { useRouter, useSearchParams } from "next/navigation";
import updateParams, {
  useUpdateSearchParams,
} from "../_hooks/useUpdateSearchParams";

export default function Filter() {
  const updateParams = useUpdateSearchParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const isActiveFilter = params.get("capacity") ?? "all";

  function handleFilter(filter) {
    updateParams("capacity", filter);
  }

  return (
    <div className="border border-primary-700 flex ">
      <Button
        handleFilter={handleFilter}
        isActiveFilter={isActiveFilter}
        filter="all"
      >
        All cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        isActiveFilter={isActiveFilter}
        filter="small"
      >
        1&mdash;3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        isActiveFilter={isActiveFilter}
        filter="medium"
      >
        4&mdash;7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        isActiveFilter={isActiveFilter}
        filter="large"
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ isActiveFilter, handleFilter, filter, children }) {
  return (
    <button
      className={`px-8 py-2 hover:bg-primary-700 ${
        isActiveFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
