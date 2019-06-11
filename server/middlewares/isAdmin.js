module.exports = (req, res, next) => {
  if (req.query.isAdmin === 'true') {
    next()
  } else {
    res.send('you are not allowed access to this info')
  }
}