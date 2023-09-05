import { Metadata } from "next"

import CalendarClient from "./CalendarClientPage"
import {events, jobTypes, personInCharge} from "@/utils/dummy/calendarDummy";

export const metadata: Metadata = {
  title: 'Calendar',
}

export default function CalendarPage() {
  return(
    <CalendarClient jobTypes={jobTypes} personInCharge={personInCharge} events={events}/>
  )
}
