const path = require('path');
const env = require('./env.json');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
	/* bydefault config  option Read For More Optios
	here https://github.com/vercel/next-plugins/tree/master/packages/next-sass
	*/
	cssModules: true
})

module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	webpack: (config) => {
		config.resolve.fallback = { fs: false };
		
		return config;
	},
	images: {
		loader: 'imgix',
		path: env.API_URL,
		images: {
			domains: [env.API_URL],
		},
	}
}
