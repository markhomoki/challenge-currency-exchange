module.exports = {
	verbose: true,
	setupFiles: [
		'<rootDir>/test-setup/shim.js',
		'<rootDir>/test-setup/setup.js',
	],
	moduleNameMapper: {
		'^app(.*)$': '<rootDir>/js/shared/$1',
	},
};
