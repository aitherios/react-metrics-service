import { createClient } from './client'
import { withMetricsServiceContext, MetricsServiceContext } from './helpers/metrics-service-context'
import { withMetricsServiceClient } from './helpers/with-metrics-service-client'
import { metricsServiceClick } from './helpers/metrics-service-click'
import debugLog from './middlewares/debug-log'
import googleAnalytics from './middlewares/google-analytics'
import googleAnalyticsLegacy from './middlewares/google-analytics-legacy'
import googleTagManager from './middlewares/google-tag-manager'
import tealium from './middlewares/tealium'

export {
  createClient,
  MetricsServiceContext,
  withMetricsServiceContext,
  withMetricsServiceClient,
  metricsServiceClick,
  debugLog,
  googleAnalytics,
  googleAnalyticsLegacy,
  googleTagManager,
  tealium,
}
