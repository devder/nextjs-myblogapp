const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// module.exports = {
// 	env: {
// 		mongodbServer: "mongodb://localhost/blogapp",
// 	},
// };
//works normally when hosting on a server that does not give access to separate env variables

module.exports = (phase) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			env: {
				mongodbServer: "mongodb://localhost/blogapp",
			},
		};
	}

	//return the actual mongodb cluster configuration
	return {
		env: {
			mongodbServer: "mongodb://localhost/blogapp",
		},
	};
};
