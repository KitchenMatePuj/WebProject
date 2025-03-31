
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/firma"
  },
  {
    "renderMode": 2,
    "route": "/actuacion"
  },
  {
    "renderMode": 2,
    "route": "/process"
  },
  {
    "renderMode": 2,
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/profile"
  },
  {
    "renderMode": 2,
    "route": "/search-users"
  },
  {
    "renderMode": 2,
    "route": "/recipes"
  },
  {
    "renderMode": 2,
    "route": "/comments"
  },
  {
    "renderMode": 2,
    "route": "/all-comments"
  },
  {
    "renderMode": 2,
    "route": "/campaign-search"
  },
  {
    "renderMode": 2,
    "route": "/campaign-creation"
  },
  {
    "renderMode": 2,
    "route": "/performance-report"
  },
  {
    "renderMode": 2,
    "route": "/payments"
  },
  {
    "renderMode": 2,
    "route": "/total-reports"
  },
  {
    "renderMode": 2,
    "route": "/details"
  },
  {
    "renderMode": 2,
    "route": "/trend-analysis"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23644, hash: '9249c02dda7fd3605ce8b5440f0d76429007e9227e43e0ac8c96185d50e9406e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17193, hash: 'e6e184dfb7a5e93cc299f03ff4ceee9f15de397ab05e97c939a653549bbfc95b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'firma/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/firma_index_html.mjs').then(m => m.default)},
    'process/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/process_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 35775, hash: 'a69e605f6d13fd5ae5bd61206730aa00b985084c44961d45263c7f3d521b68ea', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'search-users/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/search-users_index_html.mjs').then(m => m.default)},
    'recipes/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/recipes_index_html.mjs').then(m => m.default)},
    'comments/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/comments_index_html.mjs').then(m => m.default)},
    'actuacion/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/actuacion_index_html.mjs').then(m => m.default)},
    'all-comments/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/all-comments_index_html.mjs').then(m => m.default)},
    'campaign-search/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/campaign-search_index_html.mjs').then(m => m.default)},
    'campaign-creation/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/campaign-creation_index_html.mjs').then(m => m.default)},
    'total-reports/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/total-reports_index_html.mjs').then(m => m.default)},
    'payments/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/payments_index_html.mjs').then(m => m.default)},
    'details/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/details_index_html.mjs').then(m => m.default)},
    'trend-analysis/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/trend-analysis_index_html.mjs').then(m => m.default)},
    'performance-report/index.html': {size: 23876, hash: '68c8891bd47d75d47d94e65442bf716bc4a4699f307596394e90a351f531d919', text: () => import('./assets-chunks/performance-report_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 29459, hash: '9d6e8f3c36dc1958621a90ac8d48800e718d93a987635c9afa8568b538a1e8d7', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'styles-LX3XIV6V.css': {size: 7004, hash: 'P/w4mRjaSlY', text: () => import('./assets-chunks/styles-LX3XIV6V_css.mjs').then(m => m.default)}
  },
};
