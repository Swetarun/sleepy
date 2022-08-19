
//----------------------goal-----------------------------------------
const isValidGoal = function (value) {
    return ["I would go to sleep easily", "I would sleep through the night", "I'd wake up on time, refreshed"].indexOf(value) !== -1;
};

/* ------------------------------------------password format--------------------------------- */
const isValidPassword = function (data) {
    if (!/^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(data))
      return false
    else return true
}

//----------------------struggle-----------------------------------------
const isValidStruggle = function (value) {
    return ["Less than 2 weeks", "2 to 8 weeks", "More than 8 weeks"].indexOf(value) !== -1;
};

//----------------------sleepHour-----------------------------------------
const isValidSleepHour = function (value) {
    return ["1 hr", "2 hrs", "3 hrs", "4 hrs", "5 hrs", "6 hrs", "7 hrs", "8 hrs", "9 hrs", "10 hrs"].indexOf(value) !== -1;
};

const timeToMin = (value) => {
    value = value.toLowerCase()
    let x = value.split(" ")
    let hour = Number(x[0].slice(0, 2))
    let min = Number(x[0].slice(3))

    if (x[1] == "am") {
        if(hour == 12) hour = 0
        value = hour * 60 + min
    }
    else value = (12 + hour) * 60 + min

    return value
}

  module.exports = {isValidGoal, isValidPassword, isValidStruggle, isValidSleepHour, timeToMin}