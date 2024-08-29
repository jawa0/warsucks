# WARSUCKS - WAR Sucks Universal Conflict Kinetics Simulator

## Build Instructions

### Building servesim

1. Navigate to the project root directory.
2. Run the following command:

```bash
npm run build:servesim
```

### Building viewer

1. Navigate to the project root directory.
2. Run the following command:

```bash
npm run build:viewer
```

## Run Instructions

### Running servesim

#### Option 1: Running locally with npm

1. Navigate to the project root directory.
2. Run the following command:

```bash
npm run start:servesim
```

#### Option 2: Running as a Docker container

1. Navigate to the project root directory.
2. Build the Docker image:

```bash
# Unix/macOS (Bash)
docker build -t servesim ./servesim

# Windows (Command Prompt)
docker build -t servesim .\servesim

# Windows (PowerShell)
docker build -t servesim .\servesim
```

3. Run the Docker container:

```bash
# Unix/macOS (Bash)
docker run -v "$(pwd)/servesim/input:/usr/src/app/input" -v "$(pwd)/servesim/output:/usr/src/app/output" servesim

# Windows (Command Prompt)
docker run -v "%cd%\servesim\input:/usr/src/app/input" -v "%cd%\servesim\output:/usr/src/app/output" servesim

# Windows (PowerShell)
docker run -v "${PWD}\servesim\input:/usr/src/app/input" -v "${PWD}\servesim\output:/usr/src/app/output" servesim
```

### Running viewer

1. Navigate to the project root directory.
2. Run the following command:

```bash
npm run start:viewer
```

3. Open a web browser and go to `http://localhost:9000`.
4. Use the file input to select the simulation log JSON file from the `servesim/output` directory.

Note: You need to select the simulation log JSON file from the `servesim/output` directory after running the servesim simulation.