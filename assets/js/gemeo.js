// Bibliotecas
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import SimplexNoise from 'simplex-noise';
import { Sky } from 'Sky';

//----------------------------------------------------------------------------------------------------------------
// Descobre qual dos dados sobre o tempo o usuário deseja
let DadosEstacao = 'Estacao3101';
let DadosData = '25/06/2021';
let DadosHora = 12;

let QualidadeGraficos = "Alto";

let CorGraficos = '#00BFFF';

//----------------------------------------------------------------------------------------------------------------
/*
// Coleta a linha do dia desejado das tabelas "Historico" e "Previsao"
  if(Hora in LinhasDiaHistorico){
      // Calcula os parâmetros específicos da hora desejada
  }
  else if( Hora in LinhasDiaPrevisao){
      // Calcula os parâmetros específicos da hora desejada
  }
  else{
      // O valor desejado encontra-se indisponível no sistema
  }
}
*/

let Chuva = 0;
let RadiacaoSolar = 600;
let PressaoMedia = 720;
let TemperaturaMedia = 12;
let TemperaturaPontoDeOrvalho= 11;
let UmidadeMedia = 70;
let DirecaoVento = 192;
let Vento = 2.2;
let VentoRajada = 2.4;
let RadiacaoUV = 730;

//-----------------------------------------------------------------------------------------------------------
// Iniciar uma nova cena
const scene = new THREE.Scene();

//-----------------------------------------------------------------------------------------------------------
// Câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, -20);

//-----------------------------------------------------------------------------------------------------------
// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true; // Habilitar as sombras

//-----------------------------------------------------------------------------------------------------------
//Céu
let sky;

sky = new Sky();
sky.scale.setScalar(450000);
scene.add( sky );

//-----------------------------------------------------------------------------------------------------------
// Luz Ambiente (Luz geral da cena)
let LuminosidadeGeral
if(DadosHora == 0) {LuminosidadeGeral = 0}
else if(DadosHora == 1) {LuminosidadeGeral = 0}
else if(DadosHora == 2) {LuminosidadeGeral = 0}
else if(DadosHora == 3) {LuminosidadeGeral = 0}
else if(DadosHora == 4) {LuminosidadeGeral = 0}
else if(DadosHora == 5) {LuminosidadeGeral = 0.05}
else if(DadosHora == 6) {LuminosidadeGeral = 0.10}
else if(DadosHora == 7) {LuminosidadeGeral = 0.20}
else if(DadosHora == 8) {LuminosidadeGeral = 0.25}
else if(DadosHora == 9) {LuminosidadeGeral = 0.30}
else if(DadosHora == 10) {LuminosidadeGeral = 0.30}
else if(DadosHora == 11) {LuminosidadeGeral = 0.45}
else if(DadosHora == 12) {LuminosidadeGeral = 0.50}
else if(DadosHora == 13) {LuminosidadeGeral = 0.50}
else if(DadosHora == 14) {LuminosidadeGeral = 0.45}
else if(DadosHora == 15) {LuminosidadeGeral = 0.35}
else if(DadosHora == 16) {LuminosidadeGeral = 0.35}
else if(DadosHora == 17) {LuminosidadeGeral = 0.25}
else if(DadosHora == 18) {LuminosidadeGeral = 0.25}
else if(DadosHora == 19) {LuminosidadeGeral = 0.15}
else if(DadosHora == 20) {LuminosidadeGeral = 0.10}
else if(DadosHora == 21) {LuminosidadeGeral = 0}
else if(DadosHora == 23) {LuminosidadeGeral = 0}

const ambientLight = new THREE.AmbientLight(0xffffff, LuminosidadeGeral);
scene.add(ambientLight);

//-----------------------------------------------------------------------------------------------------------
// Luz Direcional (Sol/Lua)
let sun, directionalLight;
sun = new THREE.Vector3();

directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Shadow settings
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -500;
directionalLight.shadow.camera.right = 500;
directionalLight.shadow.camera.top = 500;
directionalLight.shadow.camera.bottom = -500;

let Turbidez, Direcionamento, InclinacaoSolar
if(DadosHora == 20 || DadosHora == 21 || DadosHora == 22 || DadosHora == 23 || DadosHora == 24 || DadosHora == 1){
  InclinacaoSolar = 270
  Turbidez = 15
  Direcionamento = 20
}
else if(DadosHora == 5 || DadosHora == 6) {
  InclinacaoSolar = 5
  Turbidez = 10
  Direcionamento = 15
}
else if(DadosHora == 7 || DadosHora == 8 || DadosHora == 9) {
  InclinacaoSolar = 25
  Turbidez = 5000
  Direcionamento = 2
}
else if(DadosHora == 10 || DadosHora == 11 || DadosHora == 12 || DadosHora == 13) {
  InclinacaoSolar = 35
  Turbidez = 7500
  Direcionamento = 1.5
}
else if(DadosHora == 14 || DadosHora == 15) {
  InclinacaoSolar = 155
  Turbidez = 5000
  Direcionamento = 2
}
else if(DadosHora == 16 || DadosHora == 17) {
  InclinacaoSolar = 165
  Turbidez = 50000
  Direcionamento = 10
}
else if(DadosHora == 18 || DadosHora == 19) {
  InclinacaoSolar = 175
  Turbidez = 25000
  Direcionamento = 10
}

//Parâmetros do sol na cena
const effectController = {
    turbidity: Turbidez, //Turbidez do céu (Intensidade da atmosfera -> Quanto menos núvens maior é o valor)
    rayleigh: Direcionamento, //Espalhamento dos raios solares (Cria a cor azul do céu)
    mieCoefficient: 0.00005, //Reflexão da luz na atmosfera
    mieDirectionalG: 1, //Direcionamento dessa reflexão na atmosfera
    elevation: InclinacaoSolar, //Angulação vertical do sol
    azimuth: 180, //Angulação horizontal do sol
    exposure: renderer.toneMappingExposure //Intensidade dos efeitos do sol (Intensidade da luz)
};

// Configura o sol de acordo com os parâmetros acima
function guiChanged() {
    const uniforms = sky.material.uniforms;
    uniforms['turbidity'].value = effectController.turbidity;
    uniforms['rayleigh'].value = effectController.rayleigh;
    uniforms['mieCoefficient'].value = effectController.mieCoefficient;
    uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
    const theta = THREE.MathUtils.degToRad(effectController.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms['sunPosition'].value.copy(sun);

    renderer.toneMappingExposure = effectController.exposure;

    // Update directional light position
    directionalLight.position.copy(sun).multiplyScalar(10000);

    renderer.render(scene, camera);
}

// Aplica as mudanças na cena
guiChanged();

//-----------------------------------------------------------------------------------------------------------
// Neblina
if(QualidadeGraficos == "Alto" || QualidadeGraficos == "Medio"){
  if(UmidadeMedia >= 90 && TemperaturaMedia-2 < TemperaturaPontoDeOrvalho && Vento <= 2.5 && RadiacaoSolar <= 800){
    scene.fog = new THREE.FogExp2(0xaaaaaa, 0.03);
  }
}

//-----------------------------------------------------------------------------------------------------------
// Modelo 3D da Estação Genesis
let Estacao;
const loader = new GLTFLoader();
loader.load('/assets/3D/EstacaoGenesisBlenderV3.glb', function (gltf) {
    Estacao = gltf.scene;
    Estacao.scale.set(12, 12, 12); // Escala do modelo (X6 nas 3 dimensões)
    scene.add(Estacao);
    Estacao.position.set(-4, -1.5, 0);

    // Habilita as sombras da Estação Genesis
    Estacao.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
}, undefined, function (error) {
    console.error(error);
});

//-----------------------------------------------------------------------------------------------------------
// Terreno
const width = 100; // Largura
const depth = 100; // Comprimento
const segments = 256;
const geometry = new THREE.PlaneGeometry(width, depth, segments, segments);
geometry.rotateX(-Math.PI / 2);

// Geração procedural da altura dos desníveis do terreno com o Simplex Noise
const simplex = new SimplexNoise();
const scale = 25; // Quantidade de ondas (Quanto menor, mais morros)
const height = 1; // Diferença máxima de altura (Quanto mais, mais desnivelado)

for (let i = 0; i < geometry.attributes.position.count; i++) {
    const x = geometry.attributes.position.getX(i);
    const z = geometry.attributes.position.getZ(i);
    const y = simplex.noise2D(x / scale, z / scale) * height;
    geometry.attributes.position.setY(i, y - 1);
}

geometry.computeVertexNormals();

// Textura
const textureLoader = new THREE.TextureLoader();
const grassTexture = textureLoader.load('/assets/3D/GrassTexture.jpg', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);
}, undefined, (err) => {
    console.error('Error loading texture', err);
});

const groundMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });

const terrain = new THREE.Mesh(geometry, groundMaterial);
terrain.receiveShadow = true;
scene.add(terrain);

//-----------------------------------------------------------------------------------------------------------
// Grama
function createGrass(instances, terrainGeometry, bladeDiffuse, bladeAlpha) {
  const options = { bW: 0.12, bH: 1, joints: 5 };

  // Carregando as texturas para a grama
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(bladeDiffuse);
  const alphaMap = textureLoader.load(bladeAlpha);

  // Material da grama usando shaders
  const grassMaterial = new THREE.ShaderMaterial({
    uniforms: {
      bladeHeight: { value: options.bH },
      map: { value: texture },
      alphaMap: { value: alphaMap },
      time: { value: 0 },
      tipColor: { value: new THREE.Color(0.0, 0.6, 0.0).convertSRGBToLinear() },
      bottomColor: { value: new THREE.Color(0.0, 0.1, 0.0).convertSRGBToLinear() }
    },
    vertexShader: `
      precision mediump float;
      attribute vec3 offset;
      attribute vec4 orientation;
      attribute float halfRootAngleSin;
      attribute float halfRootAngleCos;
      attribute float stretch;
      uniform float time;
      uniform float bladeHeight;
      varying vec2 vUv;
      varying float frc;
      
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      vec3 rotateVectorByQuaternion(vec3 v, vec4 q){
        return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
      }
      
      vec4 slerp(vec4 v0, vec4 v1, float t) {
        normalize(v0);
        normalize(v1);
        float dot_ = dot(v0, v1);
        if (dot_ < 0.0) {
          v1 = -v1;
          dot_ = -dot_;
        }  
        const float DOT_THRESHOLD = 0.9995;
        if (dot_ > DOT_THRESHOLD) {
          vec4 result = t*(v1 - v0) + v0;
          normalize(result);
          return result;
        }
        float theta_0 = acos(dot_);
        float theta = theta_0*t;
        float sin_theta = sin(theta);
        float sin_theta_0 = sin(theta_0);
        float s0 = cos(theta) - dot_ * sin_theta / sin_theta_0;
        float s1 = sin_theta / sin_theta_0;
        return (s0 * v0) + (s1 * v1);
      }
      
      void main() {
        frc = position.y / bladeHeight;
        float noise = 1.0 - (snoise(vec2((time - offset.x / 50.0), (time - offset.z / 50.0))));
        vec4 direction = vec4(0.0, halfRootAngleSin, 0.0, halfRootAngleCos);
        direction = slerp(direction, orientation, frc);
        vec3 vPosition = vec3(position.x, position.y + position.y * stretch, position.z);
        vPosition = rotateVectorByQuaternion(vPosition, direction);
        float halfAngle = noise * 0.15;
        vPosition = rotateVectorByQuaternion(vPosition, normalize(vec4(sin(halfAngle), 0.0, -sin(halfAngle), cos(halfAngle))));
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(offset + vPosition, 1.0);
      }
    `,
    fragmentShader: `
      precision mediump float;
      uniform sampler2D map;
      uniform sampler2D alphaMap;
      uniform vec3 tipColor;
      uniform vec3 bottomColor;
      varying vec2 vUv;
      varying float frc;
      
      void main() {
        float alpha = texture2D(alphaMap, vUv).r;
        if(alpha < 0.15) discard;
        vec4 col = vec4(texture2D(map, vUv));
        col = mix(vec4(tipColor, 1.0), col, frc);
        col = mix(vec4(bottomColor, 1.0), col, frc);
        gl_FragColor = col;
      }`,
    side: THREE.DoubleSide
  });

  const baseGeom = new THREE.PlaneGeometry(options.bW, options.bH, 1, options.joints);
  baseGeom.translate(0, options.bH / 2, 0);

  const mesh = new THREE.InstancedMesh(baseGeom, grassMaterial, instances);
  const attributeData = getAttributeData(instances, terrainGeometry);
  addAttributes(mesh, attributeData);

  return { mesh, grassMaterial };
}

function getAttributeData(instances, terrainGeometry) {
  const offsets = [];
  const orientations = [];
  const stretches = [];
  const halfRootAngleSin = [];
  const halfRootAngleCos = [];

  let quaternion_0 = new THREE.Vector4();
  let quaternion_1 = new THREE.Vector4();

  const min = -0.25;
  const max = 0.25;

  for (let i = 0; i < instances; i++) {
    const position = getRandomPositionOnTerrain(terrainGeometry);
    offsets.push(position.x, position.y, position.z);

    let angle = Math.PI - Math.random() * (2 * Math.PI);
    halfRootAngleSin.push(Math.sin(0.5 * angle));
    halfRootAngleCos.push(Math.cos(0.5 * angle));

    let RotationAxis = new THREE.Vector3(0, 1, 0);
    let x = RotationAxis.x * Math.sin(angle / 2.0);
    let y = RotationAxis.y * Math.sin(angle / 2.0);
    let z = RotationAxis.z * Math.sin(angle / 2.0);
    let w = Math.cos(angle / 2.0);
    quaternion_0.set(x, y, z, w).normalize();

    angle = Math.random() * (max - min) + min;
    RotationAxis = new THREE.Vector3(1, 0, 0);
    x = RotationAxis.x * Math.sin(angle / 2.0);
    y = RotationAxis.y * Math.sin(angle / 2.0);
    z = RotationAxis.z * Math.sin(angle / 2.0);
    w = Math.cos(angle / 2.0);
    quaternion_1.set(x, y, z, w).normalize();

    quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1);

    angle = Math.random() * (max - min) + min;
    RotationAxis = new THREE.Vector3(0, 0, 1);
    x = RotationAxis.x * Math.sin(angle / 2.0);
    y = RotationAxis.y * Math.sin(angle / 2.0);
    z = RotationAxis.z * Math.sin(angle / 2.0);
    w = Math.cos(angle / 2.0);
    quaternion_1.set(x, y, z, w).normalize();

    quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1);

    orientations.push(quaternion_0.x, quaternion_0.y, quaternion_0.z, quaternion_0.w);

    if (i < instances / 3) {
      stretches.push(Math.random() * 1.8);
    } else {
      stretches.push(Math.random());
    }
  }

  return {
    offsets,
    orientations,
    stretches,
    halfRootAngleCos,
    halfRootAngleSin
  };
}

function addAttributes(mesh, attributeData) {
  const offsets = new Float32Array(attributeData.offsets);
  const orientations = new Float32Array(attributeData.orientations);
  const stretches = new Float32Array(attributeData.stretches);
  const halfRootAngleSin = new Float32Array(attributeData.halfRootAngleSin);
  const halfRootAngleCos = new Float32Array(attributeData.halfRootAngleCos);

  mesh.geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3));
  mesh.geometry.setAttribute('orientation', new THREE.InstancedBufferAttribute(orientations, 4));
  mesh.geometry.setAttribute('stretch', new THREE.InstancedBufferAttribute(stretches, 1));
  mesh.geometry.setAttribute('halfRootAngleSin', new THREE.InstancedBufferAttribute(halfRootAngleSin, 1));
  mesh.geometry.setAttribute('halfRootAngleCos', new THREE.InstancedBufferAttribute(halfRootAngleCos, 1));
}

function multiplyQuaternions(q1, q2) {
  const x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x;
  const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y;
  const z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z;
  const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w;
  return new THREE.Vector4(x, y, z, w);
}

function getRandomPositionOnTerrain(terrainGeometry) {
  const positionAttribute = terrainGeometry.attributes.position;
  const vertexIndex = Math.floor(Math.random() * positionAttribute.count);
  const x = positionAttribute.getX(vertexIndex);
  const y = positionAttribute.getY(vertexIndex);
  const z = positionAttribute.getZ(vertexIndex);
  return new THREE.Vector3(x, y, z);
}

const bladeDiffuse = '/assets/3D/blade_diffuse.jpg';
const bladeAlpha = '/assets/3D/blade_alpha.jpg';

let instances
if(QualidadeGraficos == "Alto"){
  instances = 25000;
}
else if(QualidadeGraficos == "Medio"){
  instances = 10000;
}

const grass = createGrass(instances, geometry, bladeDiffuse, bladeAlpha);
const mesh = grass.mesh;
mesh.receiveShadow = true;
const grassMaterial = grass.grassMaterial;
scene.add(mesh);

//-----------------------------------------------------------------------------------------------------------
// Chuva
let rain
const collidingDrops = new Set();
// Criar as partículas de chuva
const rainGeometry = new THREE.BufferGeometry();

let rainCount
if(Chuva > 0){
  if(QualidadeGraficos == "Alto"){
    rainCount = Chuva*50000;
  }
  else if(QualidadeGraficos == "Medio"){
    rainCount = Chuva*25000;
  }
  else if(QualidadeGraficos == "Baixo"){
    rainCount = Chuva*10000;
  }
}

const rainVertices = [];

// Área reduzida de 100 por 100
const rainAreaSize = 100;

for (let i = 0; i < rainCount; i++) {
    const x = Math.random() * rainAreaSize - rainAreaSize / 2;
    const y = Math.random() * 200 - 100;
    const z = Math.random() * rainAreaSize - rainAreaSize / 2;
    rainVertices.push(x, y, z);
}

rainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(rainVertices, 3));

function createRainTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  
  // Desenhar uma gota de chuva simples
  context.fillStyle = 'rgba(0, 142, 175, 1)';
  context.beginPath();
  context.ellipse(36, 36, 0.75, 10, 0, 0, 2 * Math.PI);
  context.fill();
  
  // Criar a textura da gota
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Criar a textura de gota de chuva
const rainTexture = createRainTexture();

const rainMaterial = new THREE.PointsMaterial({
  map: rainTexture,
  color: 0xaaaaaa,
  transparent: true,
  opacity: 0.3,
  side: THREE.DoubleSide,
  depthWrite: false
});

rain = new THREE.Points(rainGeometry, rainMaterial);
scene.add(rain);

//-----------------------------------------------------------------------------------------------------------
// Controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Ativar amortecimento (inércia)
controls.dampingFactor = 0.25; // Fator de amortecimento
controls.screenSpacePanning = false; // Panning nas coordenadas de tela
controls.minDistance = 10; // Distância mínima do zoom
controls.maxDistance = 60; // Distância máxima do zoom
controls.minPolarAngle = -1 * Math.PI / 2; // Ângulo mínimo de visão vertical (-90 graus)
controls.maxPolarAngle = Math.PI / 2; // Ângulo máximo de visão vertical (90 graus)

controls.target.set(0, 2.5, 0);

//-----------------------------------------------------------------------------------------------------------
//Botões dos sensores
const button1 = document.getElementById('BotaoTemperaturaUmidadePressao');
const button2 = document.getElementById('BotaoPluviometro');
const button3 = document.getElementById('BotaoVelocidadeDirecaoVento');
const button4 = document.getElementById('BotaoRadiacaoSolar');
const button5 = document.getElementById('BotaoPainelSolar');
const button6 = document.getElementById('BotaoRadiacaoUV');

// Atualização da posição dos botões
function updateButtonPosition(button, position) {
    const objectPosition = new THREE.Vector3().copy(position);
    Estacao.localToWorld(objectPosition);

    // Converter a posição 3D de cada botão para uma posição 2D na tela
    const vector = objectPosition.project(camera);
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

    // Atualizar posição do botão
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.style.display = 'block';
}

//-----------------------------------------------------------------------------------------------------------
// Animação
function animate() {
    requestAnimationFrame(animate);

    // Atualizar controles
    controls.update();
    
    // Anima a grama da cena
    if(QualidadeGraficos == "Alto" || QualidadeGraficos == "Medio"){
      grassMaterial.uniforms.time.value = performance.now() / 4000;
    }

    // Anima a chuva
    if (Chuva > 0){
      const positions = rain.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] -= 0.3;
          if (positions[i + 1] < 0) {
              positions[i + 1] = 45 + Math.floor(Math.random() * 16) + Math.floor(Math.random() * 16);
          }
      }
      rain.geometry.attributes.position.needsUpdate = true;
    }

    // Atualiza a posição dos botões
    if (Estacao) {
        updateButtonPosition(button1, new THREE.Vector3(-0.06, 1.4, 0.125)); 
        updateButtonPosition(button2, new THREE.Vector3(0.32, 1.3, 0.225));
        updateButtonPosition(button3, new THREE.Vector3(-0.06, 1.65, 0.225));
        updateButtonPosition(button4, new THREE.Vector3(0.7, 1.52, 0.225));
        updateButtonPosition(button5, new THREE.Vector3(0.32, 0.9, 0.35));
        updateButtonPosition(button6, new THREE.Vector3(0.55, 1.1, 0.12));
    }

    renderer.render(scene, camera);
}

animate();

//-----------------------------------------------------------------------------------------------------------
// Responsividade
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

//-----------------------------------------------------------------------------------------------------------
//Logica da página
function FecharSessoes() {
  for (let i = 1; i <= 6; i++) {
      document.getElementById(`expandableContent${i}`).style.display = "none";
  }
}

button1.addEventListener('click', function() {
  FecharSessoes();
  document.getElementById("expandableContent1").style.display = "block";
});
button2.addEventListener('click', function() {
  FecharSessoes();
  document.getElementById("expandableContent2").style.display = "block";
});
button3.addEventListener('click', function() {
  FecharSessoes();
  document.getElementById("expandableContent3").style.display = "block";
});
button4.addEventListener('click', function() {
  FecharSessoes();
  document.getElementById("expandableContent4").style.display = "block";
});
button5.addEventListener('click', function() {
  FecharSessoes();
  document.getElementById("expandableContent5").style.display = "block";
});
button6.addEventListener('click', function() {
  FecharSessoes();
  document.getElementById("expandableContent6").style.display = "block";
});

document.getElementById('BotaoFechar1').addEventListener('click', FecharSessoes);
document.getElementById('BotaoFechar2').addEventListener('click', FecharSessoes);
document.getElementById('BotaoFechar3').addEventListener('click', FecharSessoes);
document.getElementById('BotaoFechar4').addEventListener('click', FecharSessoes);
document.getElementById('BotaoFechar5').addEventListener('click', FecharSessoes);
document.getElementById('BotaoFechar6').addEventListener('click', FecharSessoes);

//-----------------------------------------------------------------------------------------------------------
// Gráficos das informações do tempo
function MiniGraficoCircularSVG(selector, value, maxValue, color, label, svgIcon, unity) {
  const percentage = (value / maxValue) * 100;

  const options = {
      series: [percentage],
      chart: {
          height: 150,
          type: 'radialBar',
      },
      plotOptions: {
          radialBar: {
              hollow: {
                  margin: 3,
                  size: '50%',
                  image: svgIcon,
                  imageWidth: 24,
                  imageHeight: 24,
                  imageClipped: false
              },
              dataLabels: {
                  name: {
                      show: false,
                  },
                  value: {
                      show: true,
                      color: '#EEEEEE',
                      offsetY: 50,
                      fontSize: '15px',
                      formatter: function(val) {
                          return value + unity;
                      }
                  }
              }
          }
      },
      fill: {
          colors: [color]
      },
      stroke: {
          lineCap: 'round'
      },
      labels: [label],
  };

  const chart = new ApexCharts(document.querySelector(selector), options);
  chart.render();
}

//----------------------------------------------------------------------------------------------------------------

const IconeChuva = '/assets/SVG/Chuva.svg';
const IconeRadiacaoSolar = '/assets/SVG/RadiacaoSolar.svg';
const IconeTemperaturaMedia = '/assets/SVG/TermometroMedia.svg';
const IconePressaoAtomsfericaMedia = '/assets/SVG/PressaoMedia.svg';
const IconeUmidadeMedia = '/assets/SVG/UmidadeMedia.svg';
const IconeDirecaoVento = '/assets/SVG/Bussola.svg';
const IconeVento = '/assets/SVG/Vento.svg';
const IconeVentoRajada = '/assets/SVG/VentoForte.svg';

//----------------------------------------------------------------------------------------------------------------

MiniGraficoCircularSVG('#GraficoChuva', Chuva, 30, CorGraficos, 'Chuva', IconeChuva, ' mm');
MiniGraficoCircularSVG('#GraficoRadiacaoSolar', RadiacaoSolar, 1000, CorGraficos, 'Radiacao Solar', IconeRadiacaoSolar, ' Kj');
MiniGraficoCircularSVG('#GraficoTemperaturaMedia', TemperaturaMedia, 50, CorGraficos, 'Temperatura Media', IconeTemperaturaMedia, ' °C');
MiniGraficoCircularSVG('#GraficoPressaoMedia', PressaoMedia, 1000, CorGraficos, 'Pressao Atmosferica Media', IconePressaoAtomsfericaMedia, ' mB');
MiniGraficoCircularSVG('#GraficoUmidadeDoArMedia', UmidadeMedia, 100, CorGraficos, 'Umidade do Ar Media', IconeUmidadeMedia, ' %');
MiniGraficoCircularSVG('#GraficoDirecaoVento', DirecaoVento, 360, CorGraficos, 'Direcao do Vento', IconeDirecaoVento, '°');
MiniGraficoCircularSVG('#GraficoVelocidadeVento', Vento, 30, CorGraficos, 'Velocidade do Vento', IconeVento, ' m/s');
MiniGraficoCircularSVG('#GraficoVelocidadeRajadaVento', VentoRajada, 30, CorGraficos, 'Velocidade de Rajada do Vento', IconeVentoRajada, ' m/s');
MiniGraficoCircularSVG('#GraficoRadiacaoUV', RadiacaoUV, 1000, CorGraficos, 'Radiacao UV', IconeRadiacaoSolar, ' Kj');