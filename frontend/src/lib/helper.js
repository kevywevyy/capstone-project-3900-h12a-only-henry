// Helper functions

import { addMinutes, addSeconds } from "date-fns";

// Capitalizes the first letter of string
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Returns the travel time from google maps directions API response
export function getTravelTimeFromRoute(directions) {
  if (!directions) return [];
  return directions.routes[0].legs;
}

export function getArriveAndDepatureTime(startTime, legs, propertiesToInspect) {
  if (propertiesToInspect.length !== legs.length) {
    return [];
  }
  const arriveDepartureTime = [];
  let currentTime = startTime;
  for (let i = 0; i < legs.length; i++) {
    const arriveAt = addSeconds(currentTime, legs[i].duration.value);
    const departAt = addMinutes(arriveAt, propertiesToInspect[i].duration);
    arriveDepartureTime.push({
      arriveAt,
      departAt,
    });
    currentTime = departAt;
  }
  console.log(
    "ARRIVE AND DEPARTURE TIME",
    arriveDepartureTime,
    "legs",
    legs,
    "propertiesToInspect",
    propertiesToInspect
  );
  return arriveDepartureTime;
}
