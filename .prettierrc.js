module.exports = {
  // Core Prettier formatting settings
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  bracketSpacing: true,
  printWidth: 100,
  quoteProps: 'as-needed',
  semi: true,
  tabWidth: 2,
  useTabs: false,

  // Import sorting plugin settings
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: [
    '<THIRD_PARTY_MODULES>', // All external modules first
    '^[.][.]/', // Then relative parent imports (../)
    '^[.]/', // Then relative current directory imports (./)
  ],
  importOrderSortSpecifiers: true, // Sort named imports alphabetically
  importOrderGroupNamespaceSpecifiers: true, // Group `* as` imports separately
  importOrderCaseInsensitive: true, // Ignore case when sorting imports
  importOrderParserPlugins: ['typescript', 'decorators-legacy'], // For TypeScript + decorators
};
