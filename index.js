const app = require('./main');
const appPort = process.env.PORT || 8080

app.listen(appPort, () => {
  console.log('### Shopping Me Backend is running on port ' + appPort + ' with mode: ' + process.env.ENV_MODE);
  console.log('### Visit http://localhost:' + appPort + " to see detail");
});
