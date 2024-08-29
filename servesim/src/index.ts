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

class PhysicsSimulation {
    private particles: Particle[];
    private gravity: number;
    private timeStep: number;
    private duration: number;

    constructor(config: SimulationConfig) {
        this.particles = config.particles.map(p => ({
            mass: p.mass,
            position: { x: p.position[0], y: p.position[1], z: p.position[2] },
            velocity: { x: p.velocity[0], y: p.velocity[1], z: p.velocity[2] }
        }));
        this.gravity = config.simulationParameters.gravity;
        this.timeStep = config.simulationParameters.timeStep;
        this.duration = config.simulationParameters.duration;
    }

    private applyGravity(particle: Particle): void {
        particle.velocity.z += this.gravity * this.timeStep;
    }

    private updatePosition(particle: Particle): void {
        particle.position.x += particle.velocity.x * this.timeStep;
        particle.position.y += particle.velocity.y * this.timeStep;
        particle.position.z += particle.velocity.z * this.timeStep;
    }

    public run(): void {
        const steps = Math.floor(this.duration / this.timeStep);
        
        for (let step = 0; step < steps; step++) {
            for (const particle of this.particles) {
                this.applyGravity(particle);
                this.updatePosition(particle);
            }

            if (step % 100 === 0) {  // Log every 100 steps
                console.log(`Time: ${(step * this.timeStep).toFixed(3)}s`);
                this.particles.forEach((p, index) => {
                    console.log(`Particle ${index}: pos=(${p.position.x.toFixed(2)}, ${p.position.y.toFixed(2)}, ${p.position.z.toFixed(2)}), vel=(${p.velocity.x.toFixed(2)}, ${p.velocity.y.toFixed(2)}, ${p.velocity.z.toFixed(2)})`);
                });
                console.log('---');
            }
        }
    }
}

function loadSimulationConfig(filePath: string): SimulationConfig {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as SimulationConfig;
}

function main() {
    const inputDir = '/usr/src/app/input';
    const configFile = path.join(inputDir, 'sim_config.json');

    console.log('*** WARSUCKS - WAR Sucks Universal Conflict Kinetics Simulator ***\n');

    try {
        const config = loadSimulationConfig(configFile);
        const simulation = new PhysicsSimulation(config);
        console.log('Starting simulation...');
        simulation.run();
        console.log('Simulation completed.');
    } catch (error) {
        console.error('Error running simulation:', error);
    }
}

main();