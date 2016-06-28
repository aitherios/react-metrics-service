import { createClient } from './client'
import { withMetricsServiceContext, MetricsServiceContext } from './helpers/metrics-service-context'
import { withMetricsServiceClient } from './helpers/with-metrics-service-client'
import { metricsServiceClick } from './helpers/metrics-service-click'
import debugLog from './middlewares/debug-log'

export {
  createClient,
  MetricsServiceContext,
  withMetricsServiceContext,
  withMetricsServiceClient,
  metricsServiceClick,
  debugLog,
}
