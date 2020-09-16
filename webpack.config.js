const defaults = require("@wordpress/scripts/config/webpack.config");

const setTitle = require("node-bash-title");
setTitle('📕 Doc Viewer');

module.exports = {
	...defaults,
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
	},
};
