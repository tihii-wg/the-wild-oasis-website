"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { fi } from "date-fns/locale";
import { getBookings, getGuest } from "./data-service";

export async function updateProfileForm(formData) {
  const session = await auth();
  const { guestNationalID, guestNationality } = getGuest(session.user.id);
  if (!session) throw new Error("Need to be autoriser user");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID))
    throw new Error("Enter valid National Id number");

  const updatedData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);
  if (error) throw new Error("Guest coul not be updated");

  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Need to be autoriser user");

  const bookings = await getBookings(session.user.guestId);
  const bookingIds = bookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId))
    throw new Error("You do not allow to delete booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservation");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
