# This folder includes the internationalization files for the website

### STEPS TO ADD A NEW LOCALE TO THE WEBSITE

1. The environment variable `LOCALES_PATH` must be set in the **.env** file, as it's shown in the **.env.example** file, pointing to the path of the locale files. Can be local (use `locales/` folder), or an URL.
2. A dictionary in `.json` format, with the language **code** as name (for example, `br.json`), and containing all the necessary keys for the website. must be added to:
   - **If using a local folder**: the `locales/` directory.
   - **If using a remote location**: uploaded to a location of a cloud provider. This location MUST be the same as the `LOCALES_PATH` env.

The default dictionary `es.json`, can be used as reference.

3. An entry for the corresponding language **must** be added to the list present in the file `utils/localeUtils/localeList.js`. The required options are specified in the same file.
