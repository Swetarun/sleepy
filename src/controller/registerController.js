const registerModel = require("../model/registerModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isValidGoal, isValidPassword, isValidStruggle, isValidSleepHour, timeToMin } = require("../validations/validation")

const registerUser = async (req, res) => {
    try {
        let data = req.body

        let required = ["nickName", "password", "goals", "struggleDuration", "sleepTime", "wakeupTime", "sleepHour"];
        let keys = Object.keys(data);
    
        for (let i = 0; i < required.length; i++) {
            if (keys.includes(required[i])) continue;
            else
                return res
                    .status(400)
                    .send({ status: false, msg: `Required field - ${required[i]}` });
        }

        let { nickName, password, goals, struggleDuration, sleepTime, wakeupTime, sleepHour } = data
        // console.log(goals)

        const user = await registerModel.findOne({ nickName: nickName })
        if (user) {
            return res
                .status(409)
                .send({ status: false, message: "NickName already in use, please try something else" });
        }

        for (let i = 0; i < goals.length; i++) {
            if (!isValidGoal(goals[i])) {
                return res
                    .status(400)
                    .send({ status: false, message: "Please provide right goal" });
            }
        }
    

        if (!isValidStruggle(struggleDuration)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide right duration" });
        }

        if (!isValidSleepHour(sleepHour)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide right sleep duration" });
        }

        // if (typeof sleepTime != 'number' || typeof wakeupTime != 'number') {
        //     return res
        //     .status(400)
        //     .send({ status: false, message: "Please provide time in minutes" });
        // }

        if (!isValidPassword(password)) {
            return res.status(400).send({
                status: false,
                message:
                    "Password should be of min 8 characters, must have atleast 1 number, 1st character should be capital and min 1 special charater",
            });
        }
  
        // const saltRounds = 10;
        // let encryptedPassword = bcrypt
        //     .hash(password, saltRounds)
        //     .then((hash) => {
        //         console.log(`Hash: ${hash}`);
        //         return hash;
        //     });
            data.password = await bcrypt.hash(password, 10)
            // console.log(data)

        sleepTime = timeToMin(sleepTime)
        wakeupTime = timeToMin(wakeupTime)
        sleepHour = Number(sleepHour.split(" ")[0]) * 60;

        let difference = wakeupTime - sleepTime
        if (difference < 0) difference = 1440 + difference
        let efficiency = Math.ceil((sleepHour / difference) * 100)
        if (efficiency > 100) efficiency = 100
        let msg = efficiency != 100 ? "We'll get this up to 80% " : "Thats great"
        // console.log(sleepTime, wakeupTime, efficiency)
        data.sleepTime = sleepTime
        data.wakeupTime = wakeupTime
        data.sleepHour = sleepHour

        const registerData = await registerModel.create(data)
        console.log(registerData)
        return res.status(201).send({ status: true, data: `You seem to have sleep efficiency of ${efficiency}%  ${msg} 😎......A higher sleep efficiency score means a more refreshing and energizing sleep,which can help you move into your day with a sense of lightness and ease` })
        
    }
    catch (err) {
        res.status(500).send({ err: err.message });
      }
}

const login = async (req, res) => {
    try {
        let data = req.body;
        let { nickName, password } = data;
    
        if (!data) {
          return res.status(400).send({
            status: false,
            message: "User data is required for login",
          });
        }
        if (!nickName) {
          return res.status(400).send({
            status: false,
            message: "NickName is required",
          });
        }
        if (!password) {
          return res.status(400).send({
            status: false,
            message: "Password is required ",
          });
        }
        // console.log(password)
        let hash = await registerModel
          .findOne({ nickName: nickName })
          .collation({ locale: "en", strength: 2 });
        if (hash == null) {
          return res
            .status(400)
            .send({ status: false, msg: "NickName does not exist" });
        }
        // console.log(hash)
        let compare = await bcrypt.compare(password, hash.password).then((res) => {
          return res;
        });
        // console.log(compare)
    
        if (!compare) {
          return res.status(401).send({ status: false, msg: "Incorrect Password" });
        }
    
        const token = jwt.sign(
          {
            user_name: hash.nickName
          },
          "wysa-Assignment",
          { expiresIn: "10hr" }
        );
    
        res.header("Authorization", "Bearer : " + token);
        return res.status(200).send({
          status: true,
          msg: "User logged in successfully",
          data: { message: ` welcome👽👽 ${hash.nickName}` },
        });
    
      } catch (err) {
        res.status(500).send({ err: err.message });
      }
}


module.exports = {registerUser, login}