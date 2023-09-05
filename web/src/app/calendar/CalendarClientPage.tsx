'use client'

import moment from "moment"
import { Metadata } from "next"
import {FilterAlt} from '@mui/icons-material'
import FullCalendar from '@fullcalendar/react'
import momentPlugin from '@fullcalendar/moment'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { FC, createRef, useEffect, useState } from "react"
import interactionPlugin from '@fullcalendar/interaction'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatesSetArg, DayHeaderContentArg } from '@fullcalendar/core'
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material"

import './style.css'
import { CalendarEvent } from "@/utils/types/calendarEvent"

export const metadata: Metadata = {
  title: 'Calendar',
}

type Props = {
    jobTypes: string[],
    personInCharge: string[]
    events: CalendarEvent[]
}

export const CalendarClient:FC<Props> = ({jobTypes, personInCharge, events}: Props) : JSX.Element => {
  const calendarRef = createRef<FullCalendar>()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // hydration workaround for the pre-rendering during dev mode
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleFCDateChange = (fcDate:DatesSetArg) => {
    let startDate = fcDate.view.calendar.getDate()
    const momentDate = moment(startDate)
    
    if(fcDate.view.type==='timeGridWeek'){
      if(momentDate.day() === 0){
        const offset = moment(selectedDate).day()
        startDate = momentDate.clone().add(offset, 'days').toDate()
      }
    }
    setSelectedDate(startDate)
  }

  const handleMUIDateCalendarChange = (momentDate: moment.Moment | null) => {
    const fcApi = calendarRef.current?.getApi()

    if(momentDate!== null) 
    {
      setSelectedDate(momentDate.toDate())
      fcApi?.gotoDate(momentDate.toDate().toISOString())
    }
  }

  const calendarSlotLabelContent = ({text}: {text:string}) => {
    return(
      <div>
        <Typography variant="body3b">{text}</Typography>
      </div>
    )
  }

  return (
    <main>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container padding={3} columnSpacing={3}>
          <Grid item xs='auto' sx={{
            display:'flex',
            flexDirection: 'column',
            minWidth:'269px',
            alignContent:'center',
            gap:5
          }}>
            <Paper sx={{
                width: '269px',
              }}>
              {isClient && <DateCalendar showDaysOutsideCurrentMonth
                value={moment(selectedDate)}
                onChange={(e) => handleMUIDateCalendarChange(e)}
                defaultValue={(moment())}
                view="day"
                sx={{
                  width: '269px',
                  // style for current day highlight
                  "& .MuiPickersDay-today": {
                    backgroundColor: "primary.main",
                    color: 'white',
                    ":hover": {
                      backgroundColor: "primary.main",
                      color: 'white',
                    }
                  },
                  // style for selected date
                  "& .MuiPickersDay-root.Mui-selected": {
                    backgroundColor: 'primary.300',
                    color: 'primary.main',
                    ":active": {
                      backgroundColor: 'primary.300'
                    },
                    ":focus": {
                      backgroundColor: 'primary.300'
                    },
                    ":hover": {
                      backgroundColor: "primary.300",
                    }
                  },
                }}
              />}
            </Paper>
            <Box display={'flex'} flexDirection={'column'} gap={2}>
              <Box display={"flex"}>
                <Typography variant="h4">Filters</Typography>
                <FilterAlt />
              </Box>
              <Box display={'flex'} flexDirection={'column'} gap={1}>
                <FormControl fullWidth>
                  <InputLabel id="job-type">Job Type</InputLabel>
                  <Select
                    sx={{
                      backgroundColor: 'white'
                    }}
                    defaultValue={''}
                    size="medium"
                    labelId="job-type"
                    id="job-type-select"
                    label="Job Type"
                  >
                    {jobTypes.map((type, index) => <MenuItem key={index} value={type}>{type}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="person-in-charge">Person In Charge</InputLabel>
                    <Select
                      sx={{
                        backgroundColor: 'white'
                      }}
                      defaultValue={''}
                      size="medium"
                      labelId="person-in-charge"
                      id="person-in-charge-select"
                      label="Person In Charge"
                    >
                      {personInCharge.map((type, index) => <MenuItem key={index} value={type}>{type}</MenuItem>)}
                    </Select>
                </FormControl>
              </Box>
              <Button variant="contained">Apply</Button>
            </Box>
          </Grid>
          <Grid item xs>
              <Box>
                <FullCalendar
                  ref = {calendarRef}
                  plugins={[ momentPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                  initialView="dayGridMonth"
                  headerToolbar = {{
                    left: 'today prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                  selectable
                  editable
                  selectMirror
                  contentHeight= {`calc(100vh - 64px - 48px - 24px - 40px`}
                  allDaySlot = {false}
                  scrollTime={'07:00:00'}
                  scrollTimeReset={false}
                  nowIndicator={true}
                  buttonText={{
                    today: 'Today',
                    month: 'Month',
                    week: 'Week',
                    day: 'Day'
                  }}
                  viewClassNames={['customView']}
                  views={{
                    ['dayGridMonth']: {
                      titleFormat: {year: 'numeric', month: 'long'},
                      dayMaxEvents:3,
                      eventTimeFormat: {
                        hour: 'numeric',
                        minute: '2-digit',
                        omitZeroMinute: true,
                      },
                      dayHeaderContent: ({ date }: {date:Date}) => {
                        const momentDate = moment(date)
                        return (
                          <Box sx={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}>
                            <Typography variant="label1b">{`${momentDate.format('ddd')}`}</Typography>
                          </Box>
                        )
                      }
                    },
                    ['timeGridWeek']: {
                      titleFormat: {year: 'numeric', month: 'long'},
                      dayHeaderFormat: {day: 'numeric', weekday: 'short'},
                      expandRows: true,
                      viewHeight: 'auto',
                      slotLabelFormat: {
                        hour: 'numeric',
                        minute: '2-digit',
                        omitZeroMinute: true,
                      },
                      slotLabelContent: (args) => calendarSlotLabelContent(args),
                      dayHeaderContent: ({ date }: DayHeaderContentArg) => {
                        const momentDate = moment(date)
                        return (
                          <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 1
                          }}>
                            <Typography variant="label4r">{`${momentDate.format('ddd')}`}</Typography>
                            <Box sx={{
                              backgroundColor: momentDate.date() === moment().date() ? 'primary.200' : 'transparent',
                              borderRadius: '50%',
                              width: '32px',
                              height: '32px',
                              display: 'flex',
                              alignItems: 'center',
                            }}>
                              <Typography variant="label1b" width={1}>{`${momentDate.date()}`}</Typography>
                            </Box>
                          </Box>
                        )
                      }
                    },
                    ['timeGridDay']: {
                      titleFormat: {year: 'numeric', month: 'long', day: '2-digit'},
                      expandRows: true,
                      slotLabelFormat: {
                        hour: 'numeric',
                        minute: '2-digit',
                        omitZeroMinute: true,
                      },
                      slotLabelContent: (args) => calendarSlotLabelContent(args),
                      dayHeaderContent: ({ date }: {date:Date}) => {
                        return (
                          <Box>
                            <Typography variant="label1b">{`${moment(date).format('dddd')}`}</Typography>
                          </Box>
                        )
                      }
                    },
                  }}
                  events={events}
                  datesSet={(date) => handleFCDateChange(date)}
                />
              </Box>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </main>
  )
}

export default CalendarClient
