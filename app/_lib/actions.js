"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { fi } from "date-fns/locale";
import { getGuest } from "./data-service";

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

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
