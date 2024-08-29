import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface SimulationFrame {
    time: number;
    particles: {
        position: Vector3;
        velocity: Vector3;
    }[];
}

interface SimulationLog {
    config: any;
    frames: SimulationFrame[];
}

class SimulationViewer {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;
    private particles: THREE.Mesh[] = [];
    private simulationLog: SimulationLog | null = null;
    private currentFrame = 0;
    private clock: THREE.Clock;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.camera.position.z = 20;

        window.addEventListener('resize', () => this.onWindowResize(), false);

        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.addEventListener('change', (event) => this.loadSimulationLog(event));

        this.clock = new THREE.Clock();

        this.animate();
    }

    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private loadSimulationLog(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                this.simulationLog = JSON.parse(content);
                this.initializeParticles();
            };
            reader.readAsText(file);
        }
    }

    private initializeParticles() {
        if (!this.simulationLog) return;

        this.scene.clear();
        this.particles = [];

        const geometry = new THREE.SphereGeometry(0.2);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        for (const particle of this.simulationLog.frames[0].particles) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(particle.position.x, particle.position.y, particle.position.z);
            this.scene.add(mesh);
            this.particles.push(mesh);
        }
    }

    private updateParticles() {
        if (!this.simulationLog) return;

        const deltaTime = this.clock.getDelta() * 2; // Double the speed
        const frameDuration = this.simulationLog.config.simulationParameters.timeStep;
        const framesToAdvance = Math.floor(deltaTime / frameDuration);

        for (let i = 0; i < framesToAdvance; i++) {
            const frame = this.simulationLog.frames[this.currentFrame];
            for (let j = 0; j < this.particles.length; j++) {
                const position = frame.particles[j].position;
                this.particles[j].position.set(position.x, position.y, position.z);
            }

            this.currentFrame = (this.currentFrame + 1) % this.simulationLog.frames.length;
        }

        const infoElement = document.getElementById('info');
        if (infoElement) {
            const currentTime = this.simulationLog.frames[this.currentFrame].time;
            infoElement.textContent = `Time: ${currentTime.toFixed(3)}s`;
        }
    }

    private animate() {
        requestAnimationFrame(() => this.animate());

        if (this.simulationLog) {
            this.updateParticles();
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

new SimulationViewer();