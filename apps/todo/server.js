const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const public = path.join(__dirname, 'build/static');
const errorHandler = require('./middlewares/error-handler');
const apiClient = require('./middlewares/api-client');

app.use(errorHandler);
app.use(apiClient);
app.use(bodyParser.json());

app.use('/static', express.static(public));

// OAuth2 Handlers
app.get('/callback', require('./endpoints/oauth/callback'));
app.delete('/callback', require('./endpoints/oauth/uninstall'));

// Panel handlers
app.all('/', require('./endpoints/surface-render'));

// Debug endpoints
app.get('/pipedrive-api-example/:userId/:companyId', require('./endpoints/oauth/api-example'));
app.get('/db', require('./endpoints/db'));

// ToDo endpoints
app.get('/todo/:userId/:companyId/:dealId', require('./endpoints/get-todo'));
app.get('/todo/:userId/:companyId/:dealId/:recordId', require('./endpoints/get-todo'));
app.post('/todo/:userId/:companyId/:dealId', require('./endpoints/create-todo'));
app.put('/todo/:userId/:companyId/:dealId', require('./endpoints/update-todo'));
app.delete('/todo/:userId/:companyId/:dealId/:recordId', require('./endpoints/delete-todo'));

// Embedded action
app.get('/embedded-action/', require('./endpoints/embedded-action'));
app.post('/embedded-action/', require('./endpoints/embedded-action-save'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});