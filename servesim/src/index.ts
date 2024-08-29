import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('*** WARSUCKS - WAR Sucks Universal Conflict Kinetics Simulator ***\n\nCLI Server started. Type "exit" to quit.');

// Function to process input files
function processInputFiles() {
    const inputDir = '/usr/src/app/input';
    fs.readdir(inputDir, (err, files) => {
        if (err) {
            console.error('Error reading input directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(inputDir, file);
            console.log(`Processing file: ${file}`);
            const content = fs.readFileSync(filePath, 'utf-8');
            // Process the file content here
            console.log(`File content: ${content}`);
        });
    });
}

// Call processInputFiles when the app starts
processInputFiles();

rl.on('line', (input) => {
    if (input.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        rl.close();
    } else {
        console.log(`You typed: ${input}`);
    }
});