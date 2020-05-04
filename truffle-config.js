const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    // develop: {
    //   network_id: 5777,
    //   host: "127.0.0.1",
    //   port:7545
    // }
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777
    },
    compilers: {
      solc: {
        version: "0.4.25",
      },
    },
    // compilers: {
    //   solc: {
    //     version: ">=0.4.17",  
    //     docker: true,
    //     settings: {
    //       optimizer: {
    //         enabled: true, 
    //         runs: 200    
    //       }
    //     }
    //   }
    // },
  }
};
