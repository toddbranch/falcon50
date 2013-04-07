var router = new require('routes').Router()
    , home = require('./routes/home')
    , runners = require('./routes/runners')
    , new_runner = require('./routes/new_runner')
    , runner = require('./routes/runner')
    , update_runner = require('./routes/update_runner')

router.addRoute("/", home)
router.addRoute("/runners?", runners)
router.addRoute("/runners/new", new_runner)
router.addRoute("/runners/:runner", runner)
router.addRoute("/runners/:runner/update", update_runner)

module.exports = router
