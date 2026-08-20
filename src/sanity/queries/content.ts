import { defineQuery } from "next-sanity";
export const CURRENT_EDITION_QUERY = defineQuery(
  /* groq */ `*[_type=="fashionWeekEdition"&&isCurrentEdition==true][0]{title,"slug":slug.current,year,theme,tagline,description,startDate,endDate,city,country,venue,ticketUrl,isCurrentEdition}`,
);
export const DESIGNERS_QUERY = defineQuery(
  /* groq */ `*[_type=="designer"]|order(featured desc,name asc){name,"slug":slug.current,location,country,bio,featured}`,
);
export const COLLECTIONS_QUERY = defineQuery(
  /* groq */ `*[_type=="collection"]|order(year desc,title asc){title,"slug":slug.current,"designerSlug":designer->slug.current,season,year,description,muxPlaybackId}`,
);
export const RUNWAY_SHOWS_QUERY = defineQuery(
  /* groq */ `*[_type=="runwayShow"]|order(startsAt asc){title,"slug":slug.current,"designerSlug":designer->slug.current,"collectionSlug":collection->slug.current,venue,startsAt,endsAt,status,muxPlaybackId}`,
);
export const SCHEDULE_QUERY = defineQuery(
  /* groq */ `*[_type=="scheduleEvent"]|order(startsAt asc){"id":_id,title,type,description,startsAt,endsAt,venue}`,
);
export const PARTNERS_QUERY = defineQuery(
  /* groq */ `*[_type=="partner"]|order(name asc){name,tier,website}`,
);
