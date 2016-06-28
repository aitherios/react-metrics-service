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
    client.componentWillMount(...args)
  }

  componentDidMount(...args) {
    client.componentDidMount(...args)
  }

  componentWillUnmount(...args) {
    client.componentWillUnmount(...args)
  }

  render() {
    return (
      <BaseComponent {...this.props} />
    )
  }
}

export default metricsServiceContext
