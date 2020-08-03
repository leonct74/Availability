import moment from "moment";
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

  // Interval between the start and end time
  let duration = endT.diff(startT, "hours");
  // console.log("duration is: ", duration);

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

  // console.log("timeSlots is: ", timeSlots);
  return timeSlots;
}

// Return an array of dates ranges in the future corresponding to a specified array of days of the week
// Accept nWeeks param which is used to know which week in the future to use for calculating the date
// For instance if we want to know the dates of the second week after the current, nWeek will be 2
const getOneWeekAvailableDates = async (
  sourceArr,
  nWeeks,
  fulfillmentTime,
  unitOfTime
) => {
  const orderDay = moment(Date.now()).add(fulfillmentTime, unitOfTime);
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
const getMultipleWeeksAvailability = async (
  sourceArr,
  nWeeks,
  fulfillmentTime,
  unitOfTime
) => {
  let arr = [];
  let newArr = [];
  for (let i = 0; i <= nWeeks; i++) {
    newArr = await getOneWeekAvailableDates(
      sourceArr,
      i,
      fulfillmentTime,
      unitOfTime
    );
    // console.log("NEWARR: ", newArr);
    arr = [...arr, ...newArr];
  }
  return await arr;
};

export { getMultipleWeeksAvailability, getOneWeekAvailableDates, getTimeDiff };
