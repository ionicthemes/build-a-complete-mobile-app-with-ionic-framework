var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cors = require('cors'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(cors());
app.use(bodyParser.json());
app.use(compression());

app.use('/', express.static(__dirname + '/www'));

app.listen(app.get('port'), function () {
    console.log('Realty server listening on port ' + app.get('port'));
});
