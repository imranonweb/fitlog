import { Workout } from "@/types";

const BASE_URL = "https://api.api-store.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch workouts: ${res.statusText}`);
  }
  const data: Workout[] = await res.json();
  return data;
}

export async function getWorkoutById(id: string | number): Promise<Workout> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch workout #${id}: ${res.statusText}`);
  }
  const data: Workout = await res.json();
  return data;
}
