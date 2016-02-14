module.exports = function makeFilter (ips, opts) {
  ips = ips || []
  opts = opts || {}
  opts.status = opts.status || 204
  opts.pattern = opts.pattern || /\.(css|js)\.map$/

  return function sourcemapFilter (req, res, next) {
    if (opts.pattern.test(req.path) && ips.indexOf(req.ip) === -1) {
      res.status(opts.status)
      res.end()
    } else {
      next()
    }
  }
}
