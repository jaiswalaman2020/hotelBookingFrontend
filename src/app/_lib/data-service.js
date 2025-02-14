import { notFound } from "next/navigation.js";
import { eachDayOfInterval } from "date-fns";
import axios from "axios";
import { CurrencyBangladeshiIcon } from "@heroicons/react/24/solid";
// import { supabase } from "./supabase";

/////////////
// GET

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getCabin(id) {
  try {
    const res = await axios.get(`${API_URL}/cabins/${id}`);
    const cabin = res.data.data.doc;
    console.log("cabin", cabin);

    return cabin;
  } catch (err) {
    console.error(err);
    // notFound();
  }
}

export async function getCabinPrice(id) {
  try {
    const allCabins = await getCabins();
    const cabin = allCabins.find((cabin) => cabin._id === id);
    console.log("cabin", cabin.regularPrice);
    return cabin.regularPrice;
  } catch (err) {
    console.error(err);
    // notFound();
  }
}

export const getCabins = async function () {
  try {
    const res = await axios.get(`${API_URL}/cabins`);
    const cabins = res.data.data.doc;
    // console.log("cabins", cabins);

    return cabins;
  } catch (err) {
    console.error(err);
    // notFound();
  }
};

// export async function getCabins() {
//   const { data, error } = await supabase.from("cabins").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Cabins could not be loaded");
//   }

//   return data;
// }

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  try {
    const res = await axios.get(`${API_URL}/guests`);
    const guests = res.data.data.doc;
    const guest = guests.find((guest) => guest.email === email);
    return guest;
  } catch (err) {
    console.error(err);
  }
}

export async function getBooking(id) {
  try {
    const res = await axios.get(`${API_URL}/bookings/${id}`);
    const booking = res.data.data.doc;
    console.log(booking);
    return booking;
  } catch (err) {
    console.error(err);
  }
}

export async function getBookings(guestId) {
  const { data, error, count } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  // await new Promise((res) => setTimeout(res, 5000));

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

// export async function createGuest(newGuest) {
//   const { data, error } = await supabase.from("guests").insert([newGuest]);

//   if (error) {
//     console.error("Error creating guest in deep function", error);
//     throw new Error("Guest could not be created");
//   }

//   return data;
// }

export async function createGuest(newGuest) {
  try {
    const { data, error } = await supabase.from("guests").insert([newGuest]);

    if (error) {
      console.error(
        "Error creating guest in deep function",
        error.message,
        error.details
      );
      throw new Error("Guest could not be created");
    }

    return data;
  } catch (err) {
    console.error("Unexpected error creating guest", err);
    throw new Error("Guest could not be created due to an unexpected error");
  }
}
/*
export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}
*/
/////////////
// UPDATE

/*
// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(id, updatedFields) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
*/
