import fs from 'fs';
import path from 'path';
import template from './resources/EnvTemplate';

const pathToEnv = path.resolve(__dirname, '../../.env');
let fileContents = '';

// Platforms
fileContents += '# Platforms\n';

for (const platform in template.platforms) {
	fileContents += `${platform}=\n`;
}

fs.writeFileSync(pathToEnv, fileContents);
