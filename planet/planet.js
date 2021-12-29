const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;
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


const earthGeometry = new THREE.SphereGeometry(1.1, 32, 32);
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

const starTexture = new THREE.TextureLoader().load('texture/galaxy.png');
starTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
starTexture.minFilter = THREE.LinearFilter;

const earthMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    map: earthMapTexture,
    emissive: "#cbc99a",
    emissiveMap: earthNightTexture,
    emissiveIntensity: 1.1,
    bumpMap: earthBumpTexture,
    bumpScale: 0.05,
});

const cloudGeometry = new THREE.SphereGeometry(1.11, 32, 32);

const cloudMaterial = new THREE.MeshPhongMaterial({
    alphaMap: cloudTexture,
    transparent: true
});

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

const starGeometry = new THREE.SphereGeometry(80, 64, 64);

const starMaterial = new THREE.MeshBasicMaterial({
    map: starTexture,
    side: THREE.BackSide
});

const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);

scene.add(earthMesh);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 0, 0);
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
    cloudMesh.rotation.x += 0.0015;
    cloudMesh.rotation.y += 0.0015;
    cloudMesh.rotation.z += 0.0015;
    starMesh.rotation.y += 0.0001;
    pointLight.position.x = 5 * Math.cos(time/3 * (Math.PI/180));
    pointLight.position.z = -5 * Math.sin(time/3 * (Math.PI/180));
    render();
    time ++;
}

const render = () => {
    renderer.render(scene, camera);

}

animate();

document.querySelector(".learn").addEventListener("click", () => {
   window.location.href = "https://projectearth-t4j.github.io/public/index.html";
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
})
