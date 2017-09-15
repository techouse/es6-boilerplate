module.exports = {
    "parser"       : "babel-eslint",
    "env"          : {
        "node"   : true,
        "browser": true,
        "es6"    : true
    },
    "extends"      : "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules"        : {
        "no-console"     : "off",
        "indent"         : [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes"         : [
            "error",
            "single"
        ],
        "semi"           : [
            "error",
            "always"
        ]
    }
};