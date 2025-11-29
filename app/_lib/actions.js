"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateProfileForm(formData) {
  const session = await auth();
  if (!session) throw new Error("Need to be autoriser user");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  console.log(session);
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
