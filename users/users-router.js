const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, onlyhouse("test"), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

function onlyhouse(house) {
    return function(req, res, next) {
        if (req.user && req.user && req.user.house.toLowerCase() === house) {
            next();
        } else {
            res.status(403).json({ you: "have no power here" });
        }
    };
}
module.exports = router;