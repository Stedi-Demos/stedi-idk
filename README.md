# Stedi Integrations SDK

You do not need to directly install this project, it'll will be automatically included when you provision a new integrations project using the Stedi CLI.

### Using the Stedi CLI to generate a new integrations project

**NOTE:** You must have a working Node 18 or later environment installed on your machine before you proceed with the Getting Started steps.

Using the Stedi CLI you can generate an empty Typescript project with all the necessary dependencies required to build, test and deploy Step functions.

1. Ensure you have the latest Stedi CLI installed globally

   ```bash
     npm install -g @stedi/cli
   ```

1. Generate your new integrations project, and move into the newly created directory.

   ```bash
     stedi integrations init --path=my-stedi-config

     cd my-stedi-config
   ```

1. Install the npm dependencies.

   ```bash
     npm install
   ```

1. Refer to the generated README.md for next steps.

   ```bash
     open README.md
   ```
