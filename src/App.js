import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import "./styles.css";

const FulfillmentTime = 0;

const openingHours = [
  {
    locations: [
      {
        location: "westerstraat n 33 10555 - Amsterdam"
      },
      {
        location: "queenstreet n 222 10777 - Rotterdam"
      }
    ],
    weekDays: "Sunday",
    active: false,
    times: [
      {
        endTime: "18:00",
        startTime: "09:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "westerstraat n 33 10555 - Amsterdam"
      },
      {
        location: "queenstreet n 222 10777 - Rotterdam"
      }
    ],
    weekDays: "Monday",
    active: false,
    times: [
      {
        endTime: "18:00",
        startTime: "09:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "westerstraat n 33 10555 - Amsterdam"
      },
      {
        location: "queenstreet n 222 10777 - Rotterdam"
      }
    ],
    weekDays: "Tuesday",
    active: false,
    times: [
      {
        endTime: "18:00",
        startTime: "09:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "westerstraat n 33 10555 - Amsterdam"
      },
      {
        location: "queenstreet n 222 10777 - Rotterdam"
      }
    ],
    weekDays: "Wednesday",
    active: false,
    times: [
      {
        endTime: "18:00",
        startTime: "09:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "westerstraat n 33 10555 - Amsterdam"
      },
      {
        location: "queenstreet n 222 10777 - Rotterdam"
      }
    ],
    weekDays: "Thursday",
    active: true,
    times: [
      {
        endTime: "18:00",
        startTime: "09:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "westerstraat n 33 10555 - Amsterdam"
      },
      {
        location: "queenstreet n 222 10777 - Rotterdam"
      }
    ],
    weekDays: "Friday",
    active: true,
    times: [
      {
        endTime: "18:00",
        startTime: "09:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "westerstraat n 33 10555 - Amsterdam"
      },
      {
        location: "queenstreet n 222 10777 - Rotterdam"
      }
    ],
    weekDays: "Saturday",
    active: true,
    times: [
      {
        endTime: "18:00",
        startTime: "09:00"
      }
    ]
  }
];

const deliveryHours = [
  {
    locations: [
      {
        location: "1015"
      },
      {
        location: "1033"
      }
    ],
    weekDays: "Sunday",
    active: true,
    times: [
      {
        endTime: "12:00",
        startTime: "08:00"
      },
      {
        endTime: "24:00",
        startTime: "16:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "1015"
      },
      {
        location: "1033"
      }
    ],
    weekDays: "Monday",
    active: true,
    times: [
      {
        endTime: "14:00",
        startTime: "08:00"
      },
      {
        endTime: "24:00",
        startTime: "16:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "1015"
      },
      {
        location: "1033"
      }
    ],
    weekDays: "Tuesday",
    active: false,
    times: [
      {
        endTime: "12:00",
        startTime: "08:00"
      },
      {
        endTime: "24:00",
        startTime: "16:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "1015"
      },
      {
        location: "1033"
      }
    ],
    weekDays: "Wednesday",
    active: false,
    times: [
      {
        endTime: "12:00",
        startTime: "08:00"
      },
      {
        endTime: "24:00",
        startTime: "16:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "1015"
      },
      {
        location: "1033"
      }
    ],
    weekDays: "Thursday",
    active: true,
    times: [
      {
        endTime: "12:00",
        startTime: "08:00"
      },
      {
        endTime: "24:00",
        startTime: "16:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "1015"
      },
      {
        location: "1033"
      }
    ],
    weekDays: "Friday",
    active: true,
    times: [
      {
        endTime: "12:00",
        startTime: "08:00"
      },
      {
        endTime: "24:00",
        startTime: "16:00"
      }
    ]
  },
  {
    locations: [
      {
        location: "1015"
      },
      {
        location: "1033"
      }
    ],
    weekDays: "Saturday",
    active: true,
    times: [
      {
        endTime: "12:00",
        startTime: "08:00"
      },
      {
        endTime: "24:00",
        startTime: "16:00"
      }
    ]
  }
];

// Gets an array of all active day od the week and filter those not active
// const getDeliveryActives = openingHours
//   .map((item, i) => (item.active ? i : null))
//   .filter(elem => elem !== null);

// Creates an array of 1 hour timeslot from a time rage
function getTimeDiff(startTime, endTime, day) {
  const timeS = startTime; // "09:00"
  const timeE = endTime; // "18:00"
  const [hoursS, minutesS] = timeS.split(":");
  const [hoursE, minutesE] = timeE.split(":");
  //const startTFirst = moment(today.set({ hours: hoursS, minutes: 0 }));
  const startT = moment(moment(day).set({ hours: hoursS, minutes: minutesS }));
  const endT = moment(moment(day).set({ hours: hoursE, minutes: minutesE }));
  console.log("startT and endT are: ", startT, endT);

  // Interval between the start and end time
  let duration = endT.diff(startT, "hours");
  console.log("duration is: ", duration);

  let timeSlots = [];
  for (let i = 0; i < duration; i++) {
    // Moment add function mutates startT and therefore I need to be careful
    // Renders the slot adding the needed minute to start time to end the slot at 00 minutes of the next hours
    timeSlots.push(
      `${startT.format("LT")} - ${startT
        .add({ minutes: 60 - minutesS })
        .format("LT")}`
    );
  }

  console.log("timeSlots is: ", timeSlots);
  return timeSlots;
}

// Return an array of dates ranges in the future corresponding to a specified array of days of the week
// Accept nWeeks param which is used to know which week in the future to use for calculating the date
// For instance if we want to know the dates of the second week after the current, nWeek will be 2
const getOneWeekAvailableDates = async (sourceArr, nWeeks) => {
  const orderDay = moment(Date.now()).add(FulfillmentTime, "h");
  const todayDay = orderDay.date(); // get current day integer value of the month from date
  /* currentDayOfWeek needed to prevent rendering an earlier dayoftheWeek.
  For example, without it if we are on Tuesday, the previous Sunday and Monday would be
  rendered */
  const currentDayOfWeek = moment(orderDay).isoWeekday();

  return sourceArr
    .map((item, i) => {
      // Use js Intl.DateTimeFormat to get the right date format
      // and moment to get UTC date in millisecons
      if (item.active && i >= currentDayOfWeek) {
        const day = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          // year: "numeric",
          month: "long",
          day: "2-digit"
        }).format(
          moment(orderDay).day(i + nWeeks * 7) // moment().day(24); // 3 Wednesdays from now (3 + 7 + 7 + 7)
          // .format("dddd, MMMM Do YYYY LT")
        );

        return {
          locations: item.locations,
          weekDays: day,
          // If is current day we need start time to account the Fulfillment time
          timeSlots: item.times.map((tim, t) => {
            let dayDay = orderDay.date(); // day Integer value
            let isCurrentDay = todayDay - dayDay;
            const currentHours = moment(orderDay).hours(); // HERE WE ADD FULFILLMENT TIME
            const currentMinutes = moment(orderDay).minutes();
            const [startTimeHours, minutesS] = tim.startTime.split(":");

            // IMPORTANT: Below condition is needed to start rendering only the current day of the week
            // from the current hour. The condition "currentHours > startTimeHours" instead, is needed to prevent
            // the first time slot to be rendered twice when times array contains more than one timeslot/obj.
            // Infact this iteation is called for each timeslot/obj in times array.
            if (
              isCurrentDay === 0 &&
              i === currentDayOfWeek &&
              currentHours > startTimeHours
            ) {
              return getTimeDiff(
                `${currentHours}:${currentMinutes}`,
                tim.endTime,
                day
              );
            } else {
              return getTimeDiff(tim.startTime, tim.endTime, day);
            }
          })
        };
      }
      return null;
    })
    .filter(elem => elem !== null); // Filter all undefined element due to active being false
};

// .add(15 * i, 'minutes')
// .format('hh:mm A');
const getMultipleWeeksAvailability = async (sourceArr, nWeeks) => {
  let arr = [];
  let newArr = [];
  for (let i = 0; i <= nWeeks; i++) {
    newArr = await getOneWeekAvailableDates(sourceArr, i);
    console.log("NEWARR: ", newArr);
    arr = [...arr, ...newArr];
  }
  return await arr;
};

// const startTime = moment().add(30, "m"); //d = day // m = minutes
// console.log("startTime is: ", startTime);
// const endTime = moment()
//   .add(30, "m")
//   .day(9); //d = day // m = minutes
// console.log("endTime is: ", endTime);

// LOAD ARRAY DATA
// sourceArr = openingHours || deliveryHours
// nWeeks = the number of weeks to load
// const getData = async (sourceArr, nWeek) => {
//   let response = await getMultipleWeeksAvailability(sourceArr, nWeek);
//   return response;
// };

// const HomeDelivery = async props => {
//   const [time, setTime] = useState([{ locations: "test" }]);

//   return (
//     <div>
//       {time.map((loc, x) => (
//         <Typography key={`x-${x}`}>{loc.locations}</Typography>
//       ))}
//     </div>
//   );
// };

// const currentDayOfWeek = today.getDay();
export default function App() {
  const [time, setTime] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("IVOKEDDDDDDDDDD");
      const result = await getMultipleWeeksAvailability(deliveryHours, 2);
      setTime(result);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* <h1>UTC: {today}</h1> */}
      <h3>AVAILABILITY</h3>
      <div>
        {time.map((item, i) => (
          <div key={`i-1${i}`}>
            <Typography variant="subtitle1">{item.weekDays}</Typography>
            {item.locations.map((loc, x) => (
              <Typography key={`x-${x}`}>{loc.location}</Typography>
            ))}

            {// This is a map of a map because timeSlots is an array of array
            item.timeSlots.map(elem =>
              elem.map((slot, s) => (
                <div
                  key={`s-${s}`}
                  style={{
                    borderStyle: "solid",
                    borderWidth: 0.5,
                    maxWidth: 250,
                    margin: 5
                  }}
                >
                  <Typography variant="body2">{slot}</Typography>
                </div>
              ))
            )}
            {}
          </div>
        ))}
      </div>
    </div>
  );
}
