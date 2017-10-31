const osmosis = require('osmosis');
const fs = require('fs');

let savedData = [];
osmosis
	.get('https://habrahabr.ru')
	.find('.content-list_posts')
	.follow('article .post__title_link')
	.find('.post__wrapper')
	.set({
		'title': '.post__title-text',
		'text' : '.post__text'
	})
	.log(console.log)
	.data(function(data) {
		console.log(data);
		savedData.push(data);
	})
	.done(function() {
		fs.writeFile('data.json', JSON.stringify( savedData, null, 4), function(err) {
			if(err) console.error(err);
			else console.log('Data Saved to data.json file');
		})
	});