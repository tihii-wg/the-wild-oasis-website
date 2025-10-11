"use client"

import { useRouter } from "next/navigation";


export default function Error({error,reset}) {
const router = useRouter()

  return (
    <main className='flex justify-center items-center flex-col gap-6'>
      <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
      <p className='text-lg'>{error.message}</p>

      <button className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg' onClick={()=>{router.back()}} >
        Try again
      </button>
    </main>
  );
}
