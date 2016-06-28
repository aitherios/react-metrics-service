import React, { Component, PropTypes } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

const metricsServiceClick = (
  methodName, ...methodArgs
) => (BaseComponent) => class extends Component { // eslint-disable-line
  static displayName = wrapDisplayName(BaseComponent, 'metricsServiceClick')

  static contextTypes = {
    metricsServiceClient: PropTypes.object,
  }

  handleClick() {
    this.context.metricsServiceClient.callMiddlewares(methodName, ...methodArgs)
  }

  render() {
    return (
      <div onClick={::this.handleClick}>
        <BaseComponent
          {...this.props}
        />
      </div>
    )
  }
}

export { metricsServiceClick }
export default metricsServiceClick
