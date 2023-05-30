# Stedi Integrations Project

This Stedi Integrations project helps you manage your Stedi Functions. You can:

- Import source code from official [Stedi Function Templates](https://github.com/Stedi-Demos/function-templates), including their tests.
- Execute tests for each of your functions.
- Package and deploy the TypeScript code to the [Stedi Functions](https://www.stedi.com/docs/functions) compute platform.

### Requirements

You must have a working Node 18 or later environment installed on your machine before you proceed with the Getting Started steps.

### Getting Started

1. Ensure you have the dependencies installed.

   ```bash
     npm install
   ```

1. Install your first template function. The following command will install the `transaction-to-webhook` into the project along with its tests.

   ```bash
     npm run install-template transaction-to-webhook
   ```

   You can also choose to rename a template when installing:

   ```bash
   npm run install-template transaction-to-webhook my-function-name
   ```

**NOTE:** `transaction-to-webhook` is the name of a template function. You can view the (full list here)[https://github.com/Stedi-Demos/function-templates/tree/main/src/functions]

1. Run the test suite

   ```bash
     npm run test
   ```

**NOTE:** Stedi Template functions use the [AVE test runner](https://github.com/avajs/ava) for Node.js.

### Deploying the functions to Stedi

To deploy the project to your Stedi account:

1. Update the provided `.env` in the project root and ensure the following environment variable is defined:

   - `STEDI_API_KEY`: A Stedi API key is required for authentication. You
     can [generate an API key](https://www.stedi.com/app/settings/api-keys) in your Stedi account.

1. Deploy the resources:

   ```bash
     npm run deploy
   ```
