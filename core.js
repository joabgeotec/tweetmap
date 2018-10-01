let express = require('express');
let Twitter = require('twitter');
let app = express();

var listaGeral = [];

app.get('/hashtag/:hashtag', function (req, res) {

	let reqResult = req.params.hashtag

	let twitter = new Twitter({
		consumer_key: 'UcPm6s23vvfJCkuKD9fQYmgeZ', 
		consumer_secret: 'GfSm1wgXkq2oGNFVQAfiukJEsH6hXgxV6vbXWh8VbRZbPVD3mk', 
		access_token_key: '913425310779154432-dwRaGIHyehhDEjrBTSIpmMQiD7RYlwy', 
		access_token_secret: 'Thw0T3sw3hOsZg2Lncy20LFgdqAiQMHCgZNmjCPLbVfWn'
	});

	let search = "#" + reqResult;

	let index = 0;

	let result;

	twitter.stream('statuses/filter', {track: search}, function(stream) {
		stream.on('data', function(tweet) {
			index++;
			if (tweet.coordinates) {
				var coordinates = tweet.coordinates.coordinates;
			} else {
				coordinates = 'sem coordenadas.';
			}
			if(tweet.place){
				var local = tweet.place.full_name;
			} else {
				local = 'sem localização.'
			}
			result = {
				usuario: tweet.user.screen_name,
				text: tweet.text,
				criado_em: tweet.created_at,
				source: tweet.source,
				local: local,
				coordinates: coordinates
			}
			listaGeral.push(result);
			console.log(result);

			
		});

		stream.on('error', function(error) {
			console.log(error);
		});
		
	});
	res.send('armazenamento começado');
});

app.get('/listaGeral', function (req, res) {
	res.send(listaGeral);
	});

app.listen(3000, function () {
	console.log('on port 3000!');
});