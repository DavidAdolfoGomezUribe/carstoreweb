import * as THREE from "three";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.175.0/examples/jsm/loaders/GLTFLoader.js";


export function carScene(){


  // Crear la escena
  const scene = new THREE.Scene();
  const loader = new GLTFLoader();
  let car = null;

// Configurar la cámara
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(10, 200, 500);

// Crear el renderizador
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Agregar luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
  directionalLight.position.set(30, 150, -80);
  scene.add(directionalLight);

  const directionalLightTwo = new THREE.DirectionalLight(0xffffff, 3);
  directionalLightTwo.position.set(10, 200, 500); // Posición cercana a la cámara
  directionalLightTwo.target.position.set(10, 1, 0); // Apunta al coche
  scene.add(directionalLightTwo.target); // ¡No olvides esto!
  scene.add(directionalLightTwo);

  // Crear botones
  const buttonContainer = document.createElement('div');
  buttonContainer.style.position = 'absolute';
  buttonContainer.style.top = '20px';
  buttonContainer.style.left = '20px';
  buttonContainer.style.zIndex = '1000';
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = '10px';

  // Función para crear botones
  const createButton = (color, text) => {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.style.padding = '10px 20px';
  btn.style.backgroundColor = color;
  btn.style.color = 'white';
  btn.style.border = 'none';
  btn.style.borderRadius = '5px';
  btn.style.cursor = 'pointer';
  return btn;
};

// Botones para cada modelo
const redBtn = createButton('#ff0000', 'Red Corvette');
const blueBtn = createButton('#0000ff', 'Blue Corvette');
const blackBtn = createButton('#333333', 'Black Corvette');

buttonContainer.append(redBtn, blueBtn, blackBtn);
document.body.appendChild(buttonContainer);



// Función para cargar modelos
const loadModel = (modelPath) => {
  if (car) {
    scene.remove(car); // Eliminar modelo anterior
  }

  // 1. Crear el piso
const floorGeometry = new THREE.CircleGeometry(200, 80);
const floorMaterial = new THREE.MeshStandardMaterial({
color: 0x281f1d ,
side: THREE.DoubleSide,
});

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);





  loader.load(modelPath, (gltf) => {
      car = gltf.scene;
      car.scale.set(0.5, 0.5, 0.5);
      car.position.set(0, 0, 0);
      scene.add(car);
  },  undefined, (error) => {
      console.error('Error loading model:', error);
  });
};

// Cargar modelo inicial
  loadModel("../src/3dmodels/redCorvette.glb");



// Event listeners para los botones
  redBtn.addEventListener('click', () => loadModel("../src/3dmodels/redCorvette.glb"));
  blueBtn.addEventListener('click', () => loadModel("../src/3dmodels/blueCorvette.glb"));
  blackBtn.addEventListener('click', () => loadModel("../src/3dmodels/blackCorvette.glb"));

  // Variable para controlar la rotación
  let rotationSpeed = 0.005; // Velocidad de rotación (ajusta este valor para más rápido/lento


// Animación
  function animate() {
      requestAnimationFrame(animate);
      if (car) {
          car.rotation.y += rotationSpeed; // Rota en el eje Y (izquierda a derecha)
      }
      renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

}