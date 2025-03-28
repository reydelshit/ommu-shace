export type EventType = {
  id: string;
  eventName: string;
  description: string;
  tickets: string;
  isNeedApproval: string;
  capacity: number;
  location: string;
  markedLocation: string;
  startDate: string;
  endDate: string;
  tags: string;
  bannerPath: string;
  visibility: string;
  userId: string;
};

export type UserType = {
  id: string;
  fullname: string;
  profilePicture: string;
  email: string;
};

export type AttendeeType = {
  id: string;
  eventId: string;
  status: string;
  userId: string;
  createdAt: string;
  user?: {
    fullname: string;
    profilePicture: string;
    email: string;
    id: string;
  };
};

type CollaborationType = {
  id: string;
  eventId: string;
  collaboratorId: string;
  title: string;
  subtitle: string;
  email: string;
};

export type BaseEvent = EventType & {
  attendees: AttendeeType[];
  user: UserType;
  collaborations: CollaborationType[];
};

// Pagination Response for Events
export type EventsResponse = {
  events: EventType[];
  nextCursor: string | null;
};

// Event with Attendees & User Details
export type EventsWithAttendees = BaseEvent;

// Combined Response Type with Pagination & Attendees
export type EventResponseAll = EventsResponse & {
  events: BaseEvent[]; // This does NOT have user or attendees
};
