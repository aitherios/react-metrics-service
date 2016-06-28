import React, { Component, PropTypes } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

const metricsServiceContext = ({
  client,
} = {}) => (BaseComponent) => class extends Component {
  static displayName = wrapDisplayName(BaseComponent, 'metricsServiceContext')

  static childContextTypes = {
    metricsServiceClient: PropTypes.object,
  }

  getChildContext() {
    return {
      metricsServiceClient: client,
    }
  }

  componentWillMount(...args) {
    client.callMiddlewares('componentWillMount', ...args)
  }

  componentDidMount(...args) {
    client.callMiddlewares('componentDidMount', ...args)
  }

  componentWillUnmount(...args) {
    client.callMiddlewares('componentWillUnmount', ...args)
  }

  render() {
    return (
      <BaseComponent {...this.props} />
    )
  }
}

export default metricsServiceContext
