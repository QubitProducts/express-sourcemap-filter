# express-sourcemap-filter

Middleware for express that restricts sourcemap access to an array of IP addresses.


## Usage

```js
import express from 'express'
import sourcemapFilter from 'express-sourcemap-filter'

let app = express()
app.use(sourcemapFilter(['219.25.84.2'], { // config is optional - defaults shown below
  status: 204, // status code to respond with if IP is not valid
  pattern: /\.(css|js)\.map$/ // regex to test if request path is a sourcemap
}))
```


## Developing

```
make bootstrap
make test
make test-watch
make lint
```


## Want to work on this for your day job?

This project was created by the Engineering team at [Qubit][]. As we use open source libraries, we make our projects public where possible.

We're currently looking to grow our team, so if you're a JavaScript engineer and keen on ES2016 React+Redux applications and Node micro services, why not get in touch? Work with like minded engineers in an environment that has fantastic perks, including an annual ski trip, yoga, a competitive foosball league, and copious amounts of yogurt.

Find more details on our [Engineering site][eng]. Don’t have an up to date CV? Just link us your GitHub profile! Better yet, send us a pull request that improves this project.