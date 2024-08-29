import * as fs from 'fs';
import * as path from 'path';

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface Particle {
    mass: number;
    position: Vector3;
    velocity: Vector3;
}

interface SimulationConfig {
    simulationParameters: {
        gravity: number;
        timeStep: number;
        duration: number;
    };
    particles: {
        mass: number;
        position: [number, number, number];
        velocity: [number, number, number];
    }[];
}

interface SimulationFrame {
    time: number;
    particles: {
        position: Vector3;
        velocity: Vector3;
    }[];
}

interface SimulationLog {
    config: SimulationConfig;
    frames: SimulationFrame[];
}

class PhysicsSimulation {
    private particles: Particle[];
    private gravity: number;
    private timeStep: number;
    private duration: number;
    private log: SimulationLog;

    constructor(config: SimulationConfig) {
        this.particles = config.particles.map(p => ({
            mass: p.mass,
            position: { x: p.position[0], y: p.position[1], z: p.position[2] },
            velocity: { x: p.velocity[0], y: p.velocity[1], z: p.velocity[2] }
        }));
        this.gravity = config.simulationParameters.gravity;
        this.timeStep = config.simulationParameters.timeStep;
        this.duration = config.simulationParameters.duration;
        this.log = {
            config: config,
            frames: []
        };
    }

    private applyGravity(particle: Particle): void {
        particle.velocity.z += this.gravity * this.timeStep;
    }

    private updatePosition(particle: Particle): void {
        particle.position.x += particle.velocity.x * this.timeStep;
        particle.position.y += particle.velocity.y * this.timeStep;
        particle.position.z += particle.velocity.z * this.timeStep;
    }

    private logFrame(time: number): void {
        this.log.frames.push({
            time: time,
            particles: this.particles.map(p => ({
                position: { ...p.position },
                velocity: { ...p.velocity }
            }))
        });
    }

    public run(): void {
        const steps = Math.floor(this.duration / this.timeStep);

        for (let step = 0; step < steps; step++) {
            const time = step * this.timeStep;

            for (const particle of this.particles) {
                this.applyGravity(particle);
                this.updatePosition(particle);
            }

            this.logFrame(time);

            if (step % 100 === 0) {  // Log to console every 100 steps
                console.log(`Time: ${time.toFixed(3)}s`);
                this.particles.forEach((p, index) => {
                    console.log(`Particle ${index}: pos=(${p.position.x.toFixed(2)}, ${p.position.y.toFixed(2)}, ${p.position.z.toFixed(2)}), vel=(${p.velocity.x.toFixed(2)}, ${p.velocity.y.toFixed(2)}, ${p.velocity.z.toFixed(2)})`);
                });
                console.log('---');
            }
        }
    }

    public saveLog(filePath: string): void {
        fs.writeFileSync(filePath, JSON.stringify(this.log, null, 2));
        console.log(`Simulation log saved to ${filePath}`);
    }
}

function loadSimulationConfig(filePath: string): SimulationConfig {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as SimulationConfig;
}

function main() {
    const inputDir = '/usr/src/app/input';
    const outputDir = '/usr/src/app/output';
    const configFile = path.join(inputDir, 'sim_config.json');
    const logFile = path.join(outputDir, 'simulation_log.json');

    console.log('*** WARSUCKS - WAR Sucks Universal Conflict Kinetics Simulator ***\n');

    try {
        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const config = loadSimulationConfig(configFile);
        const simulation = new PhysicsSimulation(config);
        console.log('Starting simulation...');
        simulation.run();
        console.log('Simulation completed.');
        simulation.saveLog(logFile);
    } catch (error) {
        console.error('Error running simulation:', error);
    }
}

main();