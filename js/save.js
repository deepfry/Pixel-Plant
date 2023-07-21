var Storage = {
	save: function(object, key, force) {
		if (window.localStorage[key] != undefined) {
			if (force) {
				window.localStorage[key] = JSON.stringify(object);
				console.info('%cLocal Storage: %cData has been stored locally in ' + key + '!', 'color:lime;', 'color:green;');
			} else {
				if (confirm('window.localStorage.' + key + ' is not null! Overwrite?')) {
					window.localStorage[key] = JSON.stringify(object);
				}
			};
		} else {
			window.localStorage[key] = JSON.stringify(object);
		};
	},
	load: function(key) {
		if (window.localStorage[key] != undefined) {
			return JSON.parse(window.localStorage[key]);
		} else {
			console.warn('%cLocal Storage: %c' + key + ' is not defined in local storage!', 'color:lime;', 'color:red;');
			return false;
		};
	},
};