import { getRouteNorth, getRouteSouth } from "@/shared/const/routes";

export const campusList = [{
  id: 0,
  name: 'Северный Кампус',
  redirect: getRouteNorth()
}, {
  id: 1,
  name: 'Южный Кампус',
  redirect: getRouteSouth()
}] 