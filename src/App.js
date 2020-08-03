import React, { Fragment, useEffect, useState } from "react";
// import moment from "moment";
import Typography from "@material-ui/core/Typography";
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
  const nWeeks = 2;

  useEffect(() => {
    async function fetchData() {
      const result = await getMultipleWeeksAvailability(
        deliveryHours,
        nWeeks, // Int value rapresenting number of weeks in the future to be displayed
        fulfillmentTime // Int value rapresenting number of hours
      );
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
