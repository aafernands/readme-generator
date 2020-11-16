const inquirer = require("inquirer");
const fs = require("fs");
const { ENETRESET } = require("constants");
const packageJson = require("./package.json");

inquirer
	.prompt([
		{
			type: "input",
			message: "What is the project title?",
			name: "projectTitle",
		},
		{
			type: "input",
			message: "What is the project description?",
			name: "projectDescription",
		},
		{
			type: "input",
			message: "Enter project installation instructions?",
			name: "installationInstructions",
		},
		{
			type: "input",
			message: "Please enter the usage information?",
			name: "usageInformation",
		},
		{
			type: "input",
			message: "What is the contribution guidelines?",
			name: "contributionGuidelines",
		},
		{
			type: "input",
			message: "Please enter the test instructions?",
			name: "testInstructions",
		},
		{
			type: "input",
			message: "Enter your GitHub username?",
			name: "gitHubUsername",
		},
		{
			type: "input",
			message: "Enter your email address?",
			name: "emailAddress",
		},
		{
			type: "list",
			message: "Choose a license?",
			name: "licenseType",
			choices: [
				"Boost Software License 1.0",
				"Apache 2.0 License",
				"Boost Software License 1.0",
			],
		},
	])
	.then((response) => {
		console.log("reposne", response);
		let licenseType, licenseDescription;
		const currentYear = new Date().getFullYear();
		if (response.licenseType === "Apache 2.0 License") {
			licenseType =
				"[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
			licenseDescription = `
Copyright ${currentYear} ${packageJson.author}
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`;
		} else if (response.licenseType === "Boost Software License 1.0") {
			licenseType =
				"[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
			licenseDescription = `
Copyright ${currentYear} ${packageJson.author}
Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`;
		} else if (response.licenseType === "Apache License, Version 2.") {
			licenseType =
				"[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
			licenseDescription = `
Copyright ${currentYear} ${packageJson.author}
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
"[![Apache](http://www.apache.org/licenses/LICENSE-2.0)"
	
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`;
		}

		let text = `
        
# ${response.projectTitle}


${licenseType}

| Table of Contents |
| ----------- |
| [Installation](#Installation) |
| [Usage](#Usage) |
| [License](#License) |
| [Contributing](#Contributing) |


## Project Description 
---
${response.projectDescription}

## Installation
---
${response.installationInstructions}


## Usage
---
Instructions and examples for use:

![GIF video goes here](/)


${response.usageInformation}

## Contributing
---
${response.contributionGuidelines}


## Tests
---
${response.testInstructions}


## Questions?

![alt text](alexc.png)

Feel free to contact me for any question. Id be more then happy to help.

[Github](https://github.com/${response.gitHubUsername})

[Email address](https://github.com/${response.emailAddress})

## License

${licenseDescription}

`;

		fs.writeFile("README.md", text, (err) =>
			err ? console.error(err) : console.log("Success!")
		);
	});
