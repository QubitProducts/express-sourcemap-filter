var expect = require('chai').expect
var makeFilter = require('../')
var sinon = require('sinon')

describe('express-sourcemap-filter', function () {
  var next = sinon.spy()
  var status = sinon.spy()
  var end = sinon.spy()

  beforeEach(function () {
    next.reset()
    status.reset()
    end.reset()
  })

  var filter = null
  function request (path, ip) {
    var req = { path: path, ip: ip }
    var res = { status: status, end: end }
    filter(req, res, next)
  }

  describe('by default', function () {
    before(function () {
      filter = makeFilter(['127.0.0.1'])
    })

    it('should do nothing if the path is not a sourcemap', function () {
      request('/bar/foo.js')
      expect(next).to.have.been.calledOnce
      expect(status).to.not.have.been.called
      expect(end).to.not.have.been.called
    })

    it('should do nothing if the path is a sourcemap and the IP matches', function () {
      request('/bar/foo.js.map', '127.0.0.1')
      expect(next).to.have.been.calledOnce
      expect(status).to.not.have.been.called
      expect(end).to.not.have.been.called
    })

    it('should respond with 204 if the path is a sourcemap and the IP does not match', function () {
      request('/bar/foo.js.map', '127.0.0.5')
      expect(next).to.not.have.been.called
      expect(status).to.have.been.calledWith(204)
      expect(end).to.have.been.calledOnce
    })
  })

  describe('when custom opts are passed in', function () {
    before(function () {
      filter = makeFilter(['127.0.0.1'], {
        pattern: /\.jsx\.map$/,
        status: 404
      })
    })

    it('should use the custom pattern and status code', function () {
      request('/bar/foo.jsx.map', '127.0.0.5')
      expect(next).to.not.have.been.called
      expect(status).to.have.been.calledWith(404)
      expect(end).to.have.been.calledOnce
    })
  })
})
