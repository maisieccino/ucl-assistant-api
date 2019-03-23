const indexRoutes = {
  routes: {
    "/connect/uclapi": "Authorise via the UCL API",
    "/connect/uclapi/callback": "Callback from the UCL API",
    "/user": "Get information about the currently authenticated user.",
    "/timetable": {
      description: "Return the timetable for the current user.",
      parameters: {
        date: "filter by date.",
      },
    },
    "/search/people": {
      description: "Returns matching people and information about them",
      parameters: {
        query: "Name of the person you are searching for.",
      },
    },
    "/search/rooms": {
      description: "Returns matching rooms and information about them",
      parameters: {
        query: "Name of room you are searching for",
      },
    },
    "/equipment": {
      description: "Returns the equipment in the specified room",
      parameters: {
        roomid: "Room id of the room in question",
        siteid: "Site id of the room in question",
      },
    },
    "/workspaces": {
      description: "Returns all available workspaces",
      parameters: {
        survey_filter: "Optional parameter which defaults to 'student'.",
      },
    },
    "/workspaces/summary":
      "Returns summarised data about the occupancy of " +
      "all available workspaces",
    "/workspaces/historic": {
      description: "Returns historic data about the occupancy of a workspace",
      parameters: {
        id: "specify survey id for which you want historic data",
      },
    },
    "/workspaces/:id/seatinfo": "returns data for a specific workspace",
    "/workspaces/getliveimage/map.svg": {
      description: "Returns live SVG map",
      parameters: {
        survey_id: "the id of the survey to be mapped",
        map_id: "the id of the map, i.e. floor, wing, etc. See /workspaces.",
      },
    },
    "/roombookings": {
      description: "Returns non-departmental bookings",
      parameters: {
        roomid: "Room id of the room to fetch bookings for",
        siteid: "Site id of the room to fetch bookings for",
        date: "Date expressed in ISO8601, i.e. YYYYMMDD",
      },
    },
    "/freerooms": "Returns all rooms free between now and the end of the day",
    "/ping": "returns a 200 OK message. good for testing liveness",
    "/echo": "returns the HTTP message body as the content",
  },
  tips: {
    "pretty-print": "Add ?pretty=true to pretty print the json (as shown)",
  },
};

module.exports = indexRoutes;
