const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs-extra");

const format = process.argv[2];
const targetEnv = process.argv[3];

const WORKING_DIR = path.join(__dirname, "..");
const targetEnvFile = path.join(WORKING_DIR, `.env.${targetEnv}`);

export const generatedEnvFile = path.join(
  WORKING_DIR,
  format == "json" ? "env.json" : ".env"
);

if (!fs.existsSync(targetEnvFile)) {
  console.log("# [ERROR] Invalid env file");
}

if (format == "json") {
  const envData = fs.readFileSync(targetEnvFile);
  const envJSON = dotenv.parse(envData);

  fs.writeJSONSync(generatedEnvFile, envJSON);
} else {
  fs.copySync(targetEnvFile, generatedEnvFile);
  fs.appendFileSync(
    generatedEnvFile,
    `

    # !! THIS FILE IS GENERATED - DO NOT MODIFY MANUALY !!
    # !! RUN 'yarn env' IF YOU WANT TO UPDATE THE LANGUAGE SET !!
    # CURRENT ENVIRONMENT => ${targetEnv}
    `
  );
}

console.log("# [DONE] Env file is created");
