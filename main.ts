// ********************************************************************************************************************
import { Color, MathUtils, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, Vector2, WebGLRenderer } from 'three';
// ********************************************************************************************************************
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// ********************************************************************************************************************
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// ********************************************************************************************************************
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// ********************************************************************************************************************
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// ********************************************************************************************************************

// ********************************************************************************************************************
// scene & renderer
// ********************************************************************************************************************
const scene = new Scene();
scene.background = new Color('#050505');
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(800, 600);

// ********************************************************************************************************************
// camera
// ********************************************************************************************************************
const camera = new PerspectiveCamera(50, 1, 0.1, 1000);
camera.position.z = 80; camera.position.x = 128;
new OrbitControls(camera, renderer.domElement);

// ********************************************************************************************************************
// post effects
// ********************************************************************************************************************
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const unrealBloomPass = new UnrealBloomPass(new Vector2(800, 600), 4, 1, 0);
composer.addPass(unrealBloomPass);

// ********************************************************************************************************************
// meshes
// ********************************************************************************************************************
const meshes: Mesh[][] = [];
const size = 8;
const sizeHalf = size / 2;
const sizeDouble = size * 2;

for (var x = 0; x < size; x++) {

    meshes[x] = [];

    for (var y = 0; y < size; y++) {

        const geometry = new SphereGeometry(sizeHalf);
        const material = new MeshStandardMaterial({ color: '#ff8010', roughness: 0.2, transparent: false, opacity: 0.5 });
        const mesh = new Mesh(geometry, material);
        mesh.position.setX((x - sizeHalf) * size);
        mesh.position.setY((y - sizeHalf) * size);
        meshes[x][y] = mesh;

        mesh.userData.offset = 0;
        mesh.userData.speed = MathUtils.randFloat(0.05, 0.2);
        mesh.userData.direction = MathUtils.randInt(0, 1);
        scene.add(mesh);

        if ((x % 2) === 0 && (y % 2) === 0) {
            const colour = new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1));
            const point = new PointLight(colour, 0.025);
            point.position.set(mesh.position.x, mesh.position.y, sizeDouble);
            mesh.children.push(point);
        }
    }
}

// ********************************************************************************************************************
// update meshes
// ********************************************************************************************************************
function updateMeshes() {
    for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {
            const mesh = meshes[x][y];
            if (mesh.userData.direction === 0) {
                mesh.userData.offset += mesh.userData.speed;
                if (mesh.userData.offset > sizeDouble) {
                    mesh.userData.direction = 1;
                }
            }
            if (mesh.userData.direction === 1) {
                mesh.userData.offset -= mesh.userData.speed;
                if (mesh.userData.offset < 0 - sizeDouble) {
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
    updateMeshes();
}
initialise();
