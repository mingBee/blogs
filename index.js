
require('babel-core/register')
if(process.env.NODE_ENV==='development'){
  require('./server/app')
}else {
  require('./server/app')
}
