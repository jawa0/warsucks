import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('*** WARSUCKS - WAR Sucks Universal Conflict Kinetics Simulator ***\n\nCLI Server started. Type "exit" to quit.');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Goodbye!');
    rl.close();
  } else {
    console.log(`You typed: ${input}`);
  }
});