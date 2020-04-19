const { exec } = require("child_process");

export default class Commander {
  static exec(command) {
    return exec(command, (error, stdout, stderr) => {
      const res = {
        error,
        stdout,
        stderr
      }

      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      return res;
    });
  }
}

