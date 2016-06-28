# react-metrics-service
[![npm version](https://img.shields.io/npm/v/react-metrics-service.svg?style=flat-square)](https://www.npmjs.com/package/react-metrics-service)
[![dependency status](https://img.shields.io/david/team-magneto/react-metrics-service.svg?style=flat-square)](https://david-dm.org/team-magneto/react-metrics-service)
[![build status](https://img.shields.io/travis/team-magneto/react-metrics-service.svg?style=flat-square)](https://travis-ci.org/team-magneto/react-metrics-service)

React adapter for metrics services like Google Analytics, Tealium or Comcast.

## Usage

**WIP**

First create your metrics-service module (eg. using google analytics) in the file `my-metrics.js`:

```js
// my-metrics.js

import { createClient, googleAnalytics } from 'react-metrics-service'

const client = createClient()
client.addDispatcher(googleAnalytics({ trackingID: 'UA-000000-01' }))

export default client
```

Add `metricsServiceContext` high order component to your app root component:

```js
import { metricsServiceContext } from 'react-metrics-service'
import myClient from 'my-metrics'

const App = (
  // ... your app here
)

export default metricsServiceContext({ client: myClient })(App)
```

Then you can use one of the helper high order components like:

```js
import { metricsServiceClick } from 'react-metrics-service'
import MyComponent from 'my-component.js'

export default metricsServiceClick('gaSend', 'event', 'Video', 'play')(MyComponent)
```

Or use the service directly like:

```js
import myClient from 'my-metrics'

export default () => {
  // ...
  myClient.gaSend('event', 'Video', 'play')
  // ...
}
```

## TODO

* Event pool that can wait for dispatchers to boot
* Render hook support on dispatchers
* Standardize a isReady call on dispatchers

## Contributing

First of all, **thank you** for wanting to help!

1. [Fork it](https://help.github.com/articles/fork-a-repo).
2. Create a feature branch - `git checkout -b more_magic`
3. Add tests and make your changes
4. Check if tests are ok - `npm test`
5. Commit changes - `git commit -am "Added more magic"`
6. Push to Github - `git push origin more_magic`
7. Send a [pull request](https://help.github.com/articles/using-pull-requests)! :heart: :sparkling_heart: :heart:
