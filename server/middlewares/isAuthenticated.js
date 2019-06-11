module.exports = (req, res, next) => {
  let { email, password } = req.query 
  if (req.session.user) {
    next()
  }
  else if (email && password) {
    req.session.user = 'Mark'
    next()
  } else {
    res.send('you are not authenticated')
  }
}