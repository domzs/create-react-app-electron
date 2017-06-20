const net = require('net');
var child_process = require('child_process');

const client = new net.Socket();
const port = process.env.npm_package_port || 3000;

let reactMountSuccess = false;
function touchReact() {
	client.connect({ host: 'localhost', port: port }, function (s) {
		client.end();

		if (!reactMountSuccess) {
			reactMountSuccess = true;

			try {
				child_process.exec('npm run electron');	
			} catch (e) {
				console.log('=======lauch electron failed====', e);
			}
			
		}
	});		
}


touchReact();

client.on('error', function(err) {
	setTimeout(touchReact, 2000);
});