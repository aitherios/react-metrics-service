import React from 'react'
import ReactDom from 'react-dom'
import { createClient, debugLog, withMetricsServiceContext, withMetricsServiceClient } from './src'

/* eslint-disable react/prefer-stateless-function, react/no-multi-comp */

const client = createClient({ middlewares: [debugLog] })

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

class App extends React.Component {
  render() {
    return (
      <div>
        <EnhancedMyComponent />
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
