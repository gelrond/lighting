// ********************************************************************************************************************
// ********************************************************************************************************************
import { Color, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, WebGLRenderer } from 'three';
// ********************************************************************************************************************
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// ********************************************************************************************************************
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// ********************************************************************************************************************
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// ********************************************************************************************************************
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// ********************************************************************************************************************
import { random, randomInteger, randomZeroOne } from './code/helpers/random.helper';
// ********************************************************************************************************************
import { Vector2 } from './code/types/vector2';
// ********************************************************************************************************************

// ********************************************************************************************************************
// scene & renderer
// ********************************************************************************************************************
const scene = new Scene();

scene.background = new Color('#010101');

const renderer = new WebGLRenderer({ antialias: true });

renderer.setSize(800, 600);

// ********************************************************************************************************************
// camera
// ********************************************************************************************************************
const camera = new PerspectiveCamera(50, 1, 0.1, 1000);

camera.position.z = 80; camera.position.x = 128;

new OrbitControls(camera, renderer.domElement);

// ********************************************************************************************************************
// lighting
// ********************************************************************************************************************
const composer = new EffectComposer(renderer);

composer.addPass(new RenderPass(scene, camera));

const unrealBloomPass = new UnrealBloomPass(new Vector2(1024, 1024), 4, 1, 0);

composer.addPass(unrealBloomPass);

// ********************************************************************************************************************
// meshes
// ********************************************************************************************************************
const meshes: Mesh[][] = [];

const size = 8;

const sizeHalf = size / 2;

for (var x = 0; x < size; x++) {

    meshes[x] = [];

    for (var y = 0; y < size; y++) {

        const geometry = new SphereGeometry(size / 2);

        const material = new MeshStandardMaterial({ color: '#ffa000', roughness: 0.2, transparent: false, opacity: 0.5 });

        const mesh = new Mesh(geometry, material);

        mesh.position.setX((x - sizeHalf) * (size + 0));

        mesh.position.setY((y - sizeHalf) * (size + 0));

        meshes[x][y] = mesh;

        mesh.userData.offset = 0;

        mesh.userData.speed = random(0.05, 0.2);

        mesh.userData.direction = randomInteger(0, 1);

        scene.add(mesh);

        if ((x % 2) === 0 && (y % 2) === 0) {

            const colour = new Color(randomZeroOne(), randomZeroOne(), randomZeroOne());

            const point = new PointLight(colour, 0.05);

            point.position.set(mesh.position.x, mesh.position.y, size * 2);

            mesh.children.push(point);
        }
    }
}
function updateMeshes() {

    for (var x = 0; x < size; x++) {

        for (var y = 0; y < size; y++) {

            const mesh = meshes[x][y];

            if (mesh.userData.direction === 0) {

                mesh.userData.offset += mesh.userData.speed;

                if (mesh.userData.offset > size * 3) {

                    mesh.userData.direction = 1;
                }
            }
            if (mesh.userData.direction === 1) {

                mesh.userData.offset -= mesh.userData.speed;

                if (mesh.userData.offset < 0 - size * 3) {

                    mesh.userData.direction = 0;
                }
            }
            mesh.position.setZ(mesh.userData.offset);
        }
    }
}

// ********************************************************************************************************************
// initialise
// ********************************************************************************************************************
function initialise() {

    addEventListener('resize', resize);

    document.body.appendChild(renderer.domElement);

    resize();

    update();
}

// ********************************************************************************************************************
// resize
// ********************************************************************************************************************
function resize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ********************************************************************************************************************
// update
// ********************************************************************************************************************
function update() {

    requestAnimationFrame(update);

    composer.render();

    // renderer.render(scene, camera);

    updateMeshes();
}
initialise();
