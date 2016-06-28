import React, { Component, PropTypes } from 'react'

class MetricsServiceContext extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    children: PropTypes.node,
  }

  static childContextTypes = {
    metricsServiceClient: PropTypes.object,
  }

  getChildContext() {
    return {
      metricsServiceClient: this.props.client,
    }
  }

  componentWillMount(...args) {
    this.props.client.callMiddlewares('componentWillMount', ...args)
  }

  componentDidMount(...args) {
    this.props.client.callMiddlewares('componentDidMount', ...args)
  }

  componentWillUnmount(...args) {
    this.props.client.callMiddlewares('componentWillUnmount', ...args)
  }

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

const withMetricsServiceContext = ({
  client,
} = {}) => (BaseComponent) => ({ ...props }) => (
  <MetricsServiceContext client={client}>
    <BaseComponent {...props} />
  </MetricsServiceContext>
)

export { withMetricsServiceContext, MetricsServiceContext }
