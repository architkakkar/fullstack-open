# Running Tests

This project uses `npm test` for running tests. Below are some helpful commands to run specific tests:

## Run All Tests
Run all tests across all files:
```bash
npm test
```

## Run Selected Tests
Use the `only()` function in your test file, then run:
```bash
npm test -- --test-only
```

## Run Tests from a Specific File
Run all tests in a specific file:
```bash
npm test -- tests/note_api.test.js
```

## Run Tests by Name
Run tests matching a specific `test` or `describe` block name (exact or partial match):
```bash
npm test -- --test-name-pattern="there are two notes"
```
```bash
npm test -- --test-name-pattern="notes"
```