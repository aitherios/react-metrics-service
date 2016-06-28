import React from 'react'
import ReactDom from 'react-dom'
import { createClient, debugLog, withMetricsServiceContext } from './src'

/* eslint-disable react/prefer-stateless-function, react/no-multi-comp */

const client = createClient({ middlewares: [debugLog] })

class MyComponent extends React.Component {
  static contextTypes = {
    metricsServiceClient: React.PropTypes.object,
  }

  render() {
    return (
      <div
        style={{ backgroundColor: 'LightGreen' }}
        onClick={() => this.context.metricsServiceClient.click('here')}
      >
        {'MyComponent'}
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <MyComponent />
      </div>
    )
  }
}

const Enhanced = withMetricsServiceContext({ client })(App)

const div = document.createElement('div')
document.body.appendChild(div)

ReactDom.render((
  <Enhanced />
), div)
