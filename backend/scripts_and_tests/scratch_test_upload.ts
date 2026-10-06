import fs from "fs";
import axios from "axios";
import FormData from "form-data";

async function testUpload() {
  const form = new FormData();
  form.append("invoice", fs.createReadStream("src/test.pdf"));
  // wait, do I have a test.pdf? Let me see what PDFs are available
}
