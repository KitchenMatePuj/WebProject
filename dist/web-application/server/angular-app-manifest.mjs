
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
    "route": "/user"
  },
  {
    "renderMode": 2,
    "route": "/storage"
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
    "route": "/all-users"
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
    "route": "/all-recipes"
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
    'index.csr.html': {size: 23644, hash: '25b5834eec3449baf4829eea754320619b322f4d397d14e1974d44df23b0001b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17193, hash: '6ed0bd6b0fd17a33f765604c8068109a78557f6e68500b417b2d14d2f18e60e5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'user/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/user_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 29459, hash: '059cf46064438270370f1fa58a1795ab703881967abdecc7806432dd97fe8f1b', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'storage/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/storage_index_html.mjs').then(m => m.default)},
    'actuacion/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/actuacion_index_html.mjs').then(m => m.default)},
    'firma/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/firma_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'process/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/process_index_html.mjs').then(m => m.default)},
    'search-users/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/search-users_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 35775, hash: 'f2e3806cac3937b9f374310444d9eb1d61141b50da604888fd6d131d4f3c0ff1', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'all-users/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/all-users_index_html.mjs').then(m => m.default)},
    'recipes/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/recipes_index_html.mjs').then(m => m.default)},
    'comments/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/comments_index_html.mjs').then(m => m.default)},
    'all-recipes/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/all-recipes_index_html.mjs').then(m => m.default)},
    'all-comments/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/all-comments_index_html.mjs').then(m => m.default)},
    'campaign-search/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/campaign-search_index_html.mjs').then(m => m.default)},
    'total-reports/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/total-reports_index_html.mjs').then(m => m.default)},
    'performance-report/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/performance-report_index_html.mjs').then(m => m.default)},
    'payments/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/payments_index_html.mjs').then(m => m.default)},
    'campaign-creation/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/campaign-creation_index_html.mjs').then(m => m.default)},
    'trend-analysis/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/trend-analysis_index_html.mjs').then(m => m.default)},
    'details/index.html': {size: 23876, hash: 'f90640ec06c9f869fcfd4f8c1c9af88a71ce1c400a92cc4bb013397d81ecb8c6', text: () => import('./assets-chunks/details_index_html.mjs').then(m => m.default)},
    'styles-EIBQ7LG7.css': {size: 12160, hash: 'utUuo+XfC/g', text: () => import('./assets-chunks/styles-EIBQ7LG7_css.mjs').then(m => m.default)}
  },
};
