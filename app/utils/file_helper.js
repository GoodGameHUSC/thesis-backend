const fs = require("fs");
const path = require("path");

try {

  const content = fs.readFileSync(path.resolve(__dirname, "../../../processing_task.json"));
  let jsonContent = JSON.parse(content);

  if (jsonContent.hasOwnProperty("ftask_id_1"))
    console.log(jsonContent);
  // else {
  delete jsonContent["ftask_id_1"];

  let data = JSON.stringify(jsonContent);
  fs.writeFileSync(path.resolve(__dirname, "../../../processing_task.json"), data);
    console.log(jsonContent);
  // }
} catch (error) {
  console.log(error);
}