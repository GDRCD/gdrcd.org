import { defineConfig } from 'oxlint'

// Type-aware rules run through `oxlint --type-aware` (oxlint-tsgolint).
const typeCheckedRules = [
    'await-thenable',
    'no-array-delete',
    'no-base-to-string',
    'no-duplicate-type-constituents',
    'no-floating-promises',
    'no-for-in-array',
    'no-implied-eval',
    'no-misused-promises',
    'no-redundant-type-constituents',
    'no-unnecessary-type-assertion',
    'no-unsafe-argument',
    'no-unsafe-assignment',
    'no-unsafe-call',
    'no-unsafe-enum-comparison',
    'no-unsafe-member-access',
    'no-unsafe-return',
    'no-unsafe-unary-minus',
    'only-throw-error',
    'prefer-promise-reject-errors',
    'require-await',
    'restrict-plus-operands',
    'restrict-template-expressions',
    'unbound-method',
]

export default defineConfig({
    ignorePatterns: ['**/dist/**', '**/.astro/**'],
    plugins: ['typescript', 'unicorn', 'oxc', 'import'],
    categories: {
        correctness: 'error',
        suspicious: 'error',
    },
    rules: {
        'no-shadow': 'off',
        eqeqeq: ['error', 'always'],
        'typescript/consistent-type-imports': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', fix: { imports: 'safe-fix' } }],
        'import/no-unassigned-import': ['error', { allow: ['**/*.css'] }],
        ...Object.fromEntries(
            typeCheckedRules.map((rule) => {
                return [`typescript/${rule}`, 'error']
            }),
        ),
    },
})
