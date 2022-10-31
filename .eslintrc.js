module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/recommended',
    ],
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.lib.json',
                sourceType: 'module',
                tsconfigRootDir: __dirname,
            },
            plugins: ['@typescript-eslint'],
        },
        {
            files: ['*.spec.ts'],
            parserOptions: {
                project: './tsconfig.spec.json',
            },
            plugins: ['jasmine'],
            env: {
                jasmine: true,
            },
        },
    ],
};
