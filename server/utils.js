const isAllowed = (req, res, next) => {
  if (!req.user || !req.user.id) {
    const err = new Error(`⛔ You must be logged in to do that!`)
    err.status = 401
    return next(err)
  }
  next()
}

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error(`⛔ You must have Admin permissions to do that!`)
    err.status = 401
    return next(err)
  }
  next()
}

module.exports = { isAllowed, isAdmin }
