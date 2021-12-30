const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const RADIUS = 1.1;
const CLOUDRADIUS = RADIUS * 1.01;
const MOONRADIUS = RADIUS * 0.27;
//const MOONDIST = RADIUS * 60.43;
const MOONDIST = RADIUS * 2;
//const SUNDIST = RADIUS * 23090.56;
const SUNDIST = RADIUS * 3.5;
const STARDIST = SUNDIST * 100;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = SUNDIST;
scene.add(camera);

let renderer;
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x00000, 0.0);
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowCameraNear = 3;
renderer.shadowCameraFar = camera.far;
renderer.shadowCameraFov = 50;

renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.5;
renderer.shadowMapWidth = window.innerWidth;
renderer.shadowMapHeight = window.innerHeight;


const earthGeometry = new THREE.SphereGeometry(RADIUS, 32, 32);
const earthMapTexture = new THREE.TextureLoader().load('texture/earthmap2k.jpg');
earthMapTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
earthMapTexture.minFilter = THREE.LinearFilter;

const earthBumpTexture = new THREE.TextureLoader().load('texture/earthbump2k.jpg');
earthBumpTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
earthBumpTexture.minFilter = THREE.LinearFilter;

const earthNightTexture = new THREE.TextureLoader().load('texture/earthlights2k.jpg');
earthBumpTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
earthBumpTexture.minFilter = THREE.LinearFilter;

const cloudTexture = new THREE.TextureLoader().load('texture/earthhiresclouds4K.jpg');
cloudTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
cloudTexture.minFilter = THREE.LinearFilter;

const moonGeometry = new THREE.SphereGeometry(MOONRADIUS, 32, 32);
const moonMapTexture = new THREE.TextureLoader().load('texture/moonmap2k.jpg');
moonMapTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
moonMapTexture.minFilter = THREE.LinearFilter;

const moonBumpTexture = new THREE.TextureLoader().load('texture/moonbump2k.jpg');
moonBumpTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
moonBumpTexture.minFilter = THREE.LinearFilter;

const starTexture = new THREE.TextureLoader().load('texture/galaxy.png');
starTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
starTexture.minFilter = THREE.LinearFilter;

const earthMaterial = new THREE.MeshLambertMaterial({
    roughness: 1,
    map: earthMapTexture,
    emissive: "#cbc99a",
    emissiveMap: earthNightTexture,
    emissiveIntensity: 1.1,
    bumpMap: earthBumpTexture,
    bumpScale: 0.05,
});

const moonMaterial = new THREE.MeshLambertMaterial({
    roughness: 1,
    map: moonMapTexture,
    bumpMap: moonBumpTexture,
    bumpScale: 0.001,
});

const cloudGeometry = new THREE.SphereGeometry(CLOUDRADIUS, 32, 32);

const cloudMaterial = new THREE.MeshPhongMaterial({
    alphaMap: cloudTexture,
    transparent: true,
    opacity: 0.5,
});

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
cloudMesh.receiveShadow = true;
cloudMesh.castShadow = true;
scene.add(cloudMesh);

const starGeometry = new THREE.SphereGeometry(STARDIST, 64, 64);

const starMaterial = new THREE.MeshBasicMaterial({
    map: starTexture,
    side: THREE.BackSide
});

const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthMesh.receiveShadow = true;
earthMesh.castShadow = true;
earthMesh.shadowSide = THREE.DoubleSide;
scene.add(earthMesh);

const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.position = new THREE.Vector3(-MOONDIST, 0, 0);
moonMesh.castShadow = true;
moonMesh.receiveShadow = true;
moonMesh.shadowSide = THREE.DoubleSide;
scene.add(moonMesh);

const pointLight = new THREE.DirectionalLight(0xffffff, 1);
pointLight.position.set(SUNDIST, 0, 0);
pointLight.castShadow = true;
scene.add(pointLight);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

time = 0;
const animate = () => {
    requestAnimationFrame(animate);
    earthMesh.rotation.y -= 0.0015;
    moonMesh.rotation.y += 0.0015;
    moonMesh.position.x = -MOONDIST * Math.cos(time/6 * (Math.PI/180));
    moonMesh.position.z = -MOONDIST * Math.sin(time/6 * (Math.PI/180));
    cloudMesh.rotation.x += 0.0015;
    cloudMesh.rotation.y += 0.0015;
    cloudMesh.rotation.z += 0.0015;
    starMesh.rotation.y += 0.0001;
    pointLight.position.x = SUNDIST * Math.cos(time/3 * (Math.PI/180));
    pointLight.position.z = -SUNDIST * RADIUS * Math.sin(time/3 * (Math.PI/180));
    render();
    time ++;
}

const render = () => {
    renderer.render(scene, camera);
}

animate();

document.querySelector(".learn").addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:8080/public/index.html";
});

document.querySelector(".contact").addEventListener("click", () => {
    window.location.href = "https://github.com/ProjectEarth-T4J";
});

let isPlaying = false;
const audio = new Audio("music/sw.mp3");
audio.loop = true;
document.querySelector("body").addEventListener("click", async () => {
    if (!isPlaying) {
        isPlaying = true;
        audio.pause();
        await audio.play();
    }
});
