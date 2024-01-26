module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "@typescript-eslint/strict-boolean-expressions": 'off',
        "@typescript-eslint/explicit-function-return-type": 'off',
        "react/react-in-jsx-scope": 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        "react/jsx-indent": [2, 2, {checkAttributes: true}]
    }
}
