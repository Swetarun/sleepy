const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        nickName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        goals: [{
            type: String,
            required: true,
            enum: ["I would go to sleep easily", "I would sleep through the night", "I'd wake up on time, refreshed"]

        }],
        struggleDuration: {
            type: String,
            required: true,
            enum: ["Less than 2 weeks", "2 to 8 weeks", "More than 8 weeks"]
        },
        sleepTime: {
            type: String,
            required: true,
        },
        wakeupTime: {
            type: String,
            required: true,
        },
        sleepHour: {
            type: String,
            required: true
            // enum: ["1 hr", "2 hrs", "3 hrs", "4 hrs", "5 hrs", "6 hrs", "7 hrs", "8 hrs", "9 hrs", "10 hrs"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Register", userSchema);