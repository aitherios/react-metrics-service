import React from 'react'
import ReactDom from 'react-dom'
import {
  createClient,
  debugLog,
  withMetricsServiceContext,
  withMetricsServiceClient,
  metricsServiceClick,
} from './src'
import googleAnalytics from './src/middlewares/google-analytics'

/* eslint-disable react/prefer-stateless-function, react/no-multi-comp */

const client = createClient({
  middlewares: [debugLog, googleAnalytics({ trackingId: 'UA-000000-01' })],
})

class MyComponent extends React.Component {
  static propTypes = {
    metricsServiceClient: React.PropTypes.object,
  }

  render() {
    return (
      <div
        style={{ backgroundColor: 'LightGreen' }}
        onClick={() => this.props.metricsServiceClient.click('here')}
      >
        {'MyComponent'}
      </div>
    )
  }
}

const EnhancedMyComponent = withMetricsServiceClient()(MyComponent)

class OtherComponent extends React.Component {
  static propTypes = {
    metricsServiceClient: React.PropTypes.object,
  }

  render() {
    return (
      <div
        style={{ backgroundColor: 'LightBlue' }}
      >
        {'OtherComponent'}
      </div>
    )
  }
}

const EnhancedOtherComponent = metricsServiceClick('click', 'other-event')(OtherComponent)

class App extends React.Component {
  render() {
    return (
      <div>
        <EnhancedMyComponent />
        <EnhancedOtherComponent />
      </div>
    )
  }
}

const EnhancedApp = withMetricsServiceContext({ client })(App)

const div = document.createElement('div')
document.body.appendChild(div)

ReactDom.render((
  <EnhancedApp />
), div)
