import React, { Fragment, useEffect, useState } from "react";
// import moment from "moment";
import { Typography } from "@material-ui/core";
import "./styles.css";
// CUSTOM LIB
import { getMultipleWeeksAvailability } from "../libs/availability";

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

// const currentDayOfWeek = today.getDay();
export default function App() {
  // INITIAL STATE
  const [time, setTime] = useState([]);

  // VARIABLES
  const fulfillmentTime = 0;
  const unitOfTime = "h";
  const nWeeks = 2;

  useEffect(() => {
    async function fetchData() {
      const result = await getMultipleWeeksAvailability(
        deliveryHours,
        nWeeks, // Int value rapresenting number of weeks in the future to be displayed
        fulfillmentTime, // Int value rapresenting number of hours
        unitOfTime // String value rapresenting the moment unit of time: d (day) or h (hours) or m (minutes)
      );
      // console.log(":@rener: ", result[0].timeSlots.length)
      setTime(result);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* <h1>UTC: {today}</h1> */}
      <h3>AVAILABILITY</h3>
      <div>
        {time.map((item, i) =>
          // The below condition, is to ensure to rendered the dayOfWeek that have available timeslot at current time
          // Without this condition if last timeslot is at 16:00 and we are checking the order at 16:00,
          // the dayOfTheWeek will be rendered but empty of any available timeSlot
          item.timeSlots.length > 0 ? (
            <div
              key={`i-1${i}`}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
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
                      width: 150,
                      paddingLeft: 10,
                      paddingRight: 10,
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
            </div>
          ) : (
            <Fragment />
          )
        )}
      </div>
    </div>
  );
}
