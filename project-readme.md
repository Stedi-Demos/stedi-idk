# Stedi Integrations Project

This Stedi Integrations project helps you manage your Stedi Functions, you can:

- Import the source code from the official [Stedi Function Templates](https://github.com/Stedi-Demos/function-templates) including their tests.
- Execute tests for each of your functions.
- Package and deploy the Typescript code to the Stedi Functions compute platform.

### Requirements

You must have a working Node 18 or later environment installed on your machine before you proceed with the Getting Started steps.

### Getting Started

1. Ensure you have the dependencies installed.

   ```bash
     npm install
   ```

1. Install your first template function, the following command will install the `transaction-to-webhook` into the project along with it's tests.

   ```bash
     npm run install-template transaction-to-webhook
   ```

   You can also choose to rename a template when installing:

   ```bash
   npm run install-template transaction-to-webhook my-function-name
   ```

**NOTE:** `transaction-to-webhook is the name of template function, you can view the (entire list here)[https://github.com/Stedi-Demos/function-templates/tree/main/src/functions]

1. Run the test suite

   ```bash
     npm run test
   ```

**NOTE:** Stedi Template functions use the ava test runner for Node.js.

### Deploying the functions to Stedi

To deploy the project to your Stedi account:

1. Update the provided `.env` in the project root and ensure the following environment variable is defined:

   - `STEDI_API_KEY`: A Stedi API key is required for authentication. You
     can [generate an API key](https://www.stedi.com/app/settings/api-keys) in your Stedi account.

1. Deploy the resources:

   ```bash
     npm run deploy
   ```
