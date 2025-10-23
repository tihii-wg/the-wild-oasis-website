import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function updateParams(key, value) {
    const params = new URLSearchParams(searchParams);

    if (value === null || value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return updateParams;
}
