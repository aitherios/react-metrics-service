import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

const metricsServiceContext = ({
  client,
} = {}) => (BaseComponent) => class extends Component {
  static displayName = wrapDisplayName(BaseComponent, 'metricsServiceContext')

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
