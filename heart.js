// Cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Coração em partículas
const particles = new THREE.BufferGeometry();
const count = 10000;
const positions = [];

for (let i = 0; i < count; i++) {
  let t = Math.random() * Math.PI * 2;
  let r = 1 - Math.random() * 0.5;
  let x = 16 * Math.pow(Math.sin(t), 3) * r;
  let y = (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * r;
  let z = (Math.random() - 0.5) * 2;
  positions.push(x * 0.5, y * 0.5, z);
}

particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xff69b4,
  size: 0.1,
  transparent: true,
  opacity: 0
});

const points = new THREE.Points(particles, material);
scene.add(points);

camera.position.z = 20;

// Animação GSAP
gsap.to(material, {
  duration: 2,
  opacity: 1,
  ease: 'power2.inOut'
});

// Loop de animação
function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.002;
  points.rotation.x += 0.001;
  renderer.render(scene, camera);
}
animate();
