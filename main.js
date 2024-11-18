import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType( 'local' );

document.body.appendChild(renderer.domElement);

document.body.appendChild( VRButton.createButton( renderer ) );
const scene = new THREE.Scene();

// Añadir un controlador VR
const controller = renderer.xr.getController(0);
scene.add(controller);

//CAMARA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(-10, 2, 30)
controls.target.set(-1,2,0);
controls.update()

//Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xffffff, 0.4);

pointLight1.position.set(-20, 30, -10);
pointLight1.castShadow = true;
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 0.3);

pointLight2.position.set(20, 30, -10);
pointLight2.castShadow = true;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 0.4);

pointLight3.position.set(-20, 30, 10);
pointLight3.castShadow = true;
scene.add(pointLight3);

const pointLight5 = new THREE.PointLight(0xffffff, 0.8);

pointLight5.position.set(0, 1, 40);
pointLight5.castShadow = true;
scene.add(pointLight5);

const pointLight6 = new THREE.PointLight(0xffffff, 0.8);

pointLight6.position.set(0, 1, -40);
pointLight6.castShadow = true;
scene.add(pointLight6);

//ESCENARIO
const textureLoader = new THREE.TextureLoader();

// Piso
const ambientOcclusionTexture = textureLoader.load('Piso y Paredes/Wood_Wall_003_ambientOcclusion.jpg');
const baseColorTexture = textureLoader.load('Piso y Paredes/Wood_Wall_003_basecolor.jpg');
const normalTexture = textureLoader.load('Piso y Paredes/Wood_Wall_003_normal.jpg');
const roughnessTexture = textureLoader.load('Piso y Paredes/Wood_Wall_003_roughness.jpg');
const heightTexture = textureLoader.load('Piso y Paredes/Wood_Wall_003_height.png');

// Crear el material con las texturas aplicadas
const material1 = new THREE.MeshPhongMaterial({
    map: baseColorTexture,
    normalMap: normalTexture,
    emissiveMap: ambientOcclusionTexture,
    shininess: 50,
    specular: 0xffffff,
    specularMap: roughnessTexture,
    transparent: true,
    displacementMap: heightTexture,
    displacementScale: 0
});

////////////////////////PINTURAS
function createPaint(tamx,posx, posz, rotationY, texturePath, name) {
    const geometry = new THREE.BoxGeometry(tamx, 5.2, 0.1); 
    const material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(texturePath), 
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(posx, 3, posz);
    cube.name = name
    cube.rotation.y = rotationY;
    scene.add(cube);
}
//Cuadros afuera horizontal
createPaint(5.2,-17.8, -17.2, Math.PI / 3.9, 'Pinturas[1]/Pinturas/Cuadrado/artemisa.jpg', 'Artemisa');
createPaint(5.2,-3.5,-24.2, Math.PI / -1.05, 'Pinturas[1]/Pinturas/Cuadrado/autorretrato_con_un_girasol.jpeg','Autorretrato con un girasol'); 
createPaint(5.2,11,-21.8, Math.PI / -6.5, 'Pinturas[1]/Pinturas/Cuadrado/baco_y_ariadna.png', 'Baco y Ariadna'); 
createPaint(5.2,21.71, -11.5, Math.PI / -2.9, 'Pinturas[1]/Pinturas/Cuadrado/el_nacimiento_de_venus.png', 'El nacimiento de venus');

createPaint(5.2,17.8, 17.2, Math.PI / 3.9, 'Pinturas[1]/Pinturas/Cuadrado/el_rapto_de_europa.png', 'El rapto de Europa');
createPaint(5.2,3.5,24.2, Math.PI / -1.05, 'Pinturas[1]/Pinturas/Cuadrado/judit_decapitando_a_holofernes.jpeg', 'Judith decapitando a Holofenes'); 
createPaint(5.2,-11,21.8, Math.PI / -6.5, 'Pinturas[1]/Pinturas/Cuadrado/la_balsa_de_la_medusa.jpg', 'La balsa de la medusa'); 
createPaint(5.2,-21.71, 11.5, Math.PI / -2.9, 'Pinturas[1]/Pinturas/Cuadrado/la_creacion_de_adan.jpg', 'La creación de Adán');

//Cuadros Adentro horizontal
createPaint(5.2,18.75, 9.3, Math.PI / 2.9, 'Pinturas[1]/Pinturas/Cuadrado/la_incredulidad_de_santo_tomas.jpg', 'La incredulidad de santo Tomás'); 
createPaint(5.2,9,18.9, Math.PI /-1.16 , 'Pinturas[1]/Pinturas/Cuadrado/la_libertad_guiando_al_pueblo.jpg', 'La libertad guiando al pueblo'); 
createPaint(5.2,-3,20.8, Math.PI / -15, 'Pinturas[1]/Pinturas/Cuadrado/la_ronda_de_la_noche.jpg', 'La ronda de la noche'); 
createPaint(5.2,-15.1,14.4, Math.PI / -3.9, 'Pinturas[1]/Pinturas/Cuadrado/Narciso.jpeg', 'Narciso'); 

createPaint(5.2,-18.75, -9.3, Math.PI / 2.9, 'Pinturas[1]/Pinturas/Cuadrado/rapto_de_las_sabinas.jpeg', 'Rapto de las sabinas'); 
createPaint(5.2,-9,-18.9, Math.PI /-1.16 , 'Pinturas[1]/Pinturas/Cuadrado/sanson_y_dalila.jpg', 'Sansón y dalila'); 
createPaint(5.2,3,-20.8, Math.PI / -15, 'Pinturas[1]/Pinturas/Cuadrado/ultima_cena.jpg', 'La última cena'); 
createPaint(5.2,15.1,-14.4, Math.PI / -3.9, 'Pinturas[1]/Pinturas/Cuadrado/venus_dormida.png', 'Venus dormida'); 

//Cuadros adentro verticales
createPaint(2.5,7, 7, Math.PI / 4, 'Pinturas[1]/Pinturas/Vertical/adoracion_de_los_reyes_magos.jpeg', 'La adoración de los reyes magos');
createPaint(2.5,1.5,10, Math.PI / 36, 'Pinturas[1]/Pinturas/Vertical/cristo_en_en_la_cruz.jpg', 'Cristo en la cruz'); 
createPaint(2.5,-4.5, 9, 330 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/david_con_la_cabeza_de_goliat.jpg', 'David con la cabeza de Goliat');
createPaint(2.5,-9, 4.5, 300 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/el_caminante_sobre_el_mar_de_nubes.jpg', 'El caminante sobre las nubes');

createPaint(2.5,-7, -7, Math.PI / 4, 'Pinturas[1]/Pinturas/Vertical/hombre_de_vitruvio.jpg', 'Hombre de vitruvio');
createPaint(2.5,-1.5,-10, Math.PI / 36, 'Pinturas[1]/Pinturas/Vertical/judith_y_sus_doncellas.jpeg', 'Judith y sus doncellas'); 
createPaint(2.5,4.5, -9, 330 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/la_duquesa_fea.jpg', 'La duqesa fea');
createPaint(2.5,9, -4.5, 300 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/la_joven_de_la_perla.jpg', 'La joven de la perla');

//Cuadros afuera vesticales
createPaint(2.5,10.5, 5.2, 245 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/la_lechera.jpeg', 'La lechera');
createPaint(2.5,5.5,10.2, 205 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/las_meninas.jpg', 'Las meninas'); 
createPaint(2.5,-1.8, 11.4, 170 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/magdalena_penitente_de_la_lamparilla.jpg', 'Magdalena penitente de la lamparilla');
createPaint(2.5,-8.2, 8, 135 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/monalisa.jpg', 'Monalisa');

createPaint(2.5,-10.5, -5.2, 245 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/mujeres_en_la_ventana.jpg', 'Mujeres en la ventana');
createPaint(2.5,-5.5,-10.2, 205 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/ninos_comiendo_uvas_y_melon.jpg', 'Niños comiendo uvas y melón'); 
createPaint(2.5,1.8, -11.4, 170 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/virgen_de_las_rocas.jpg', 'Virgen de las rocas');
createPaint(2.5,8.2, -8, 135 * (Math.PI / 180), 'Pinturas[1]/Pinturas/Vertical/virgen_del_clavel.jpg', 'Virgen del clavel');

const geometry1 = new THREE.BoxGeometry(60, 1, 60);
const mesh = new THREE.Mesh(geometry1, material1);
mesh.receiveShadow = true;
scene.add(mesh);
mesh.position.y = -0.5;

function loadFBXModel(url, scale, position, rotation, materialMap) {
    const loader = new FBXLoader();
    loader.load(url, function (object) {
        if (object) {
            object.traverse(function (child) {
                if (child.isMesh) {
                    console.log(child.name);
                    if (materialMap[child.name]) {
                        child.material = materialMap[child.name];
                    } else {
                        child.material = child.material;
                    }
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }

        object.scale.set(scale.x, scale.y, scale.z);
        object.position.set(position.x, position.y, position.z);
        object.rotation.set(rotation.x, rotation.y, rotation.z);
        scene.add(object); 
    });
}
const materialS = {

};


loadFBXModel('Museo.fbx', { x:1 , y: 1, z: 1 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, materialS);



function animate() {

    controls.update();

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// Añadir un rayo visual al controlador
const lineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const line = new THREE.Line(lineGeometry, lineMaterial);
line.name = 'line';
line.scale.z = 20; // Longitud del rayo
controller.add(line);

//Funciones para que la información salga 
const raycaster = new THREE.Raycaster();
const tempMatrix = new THREE.Matrix4();

// Evento de selección
controller.addEventListener('selectstart', () => {
    // Usar la posición y orientación del controlador
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    // Detectar intersecciones con objetos de la escena
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        const color = new THREE.Color(Math.random(), Math.random(), Math.random());
        selectedObject.material.color = color; // Cambiar el color del objeto seleccionado
        console.log(`${selectedObject.name || "Objeto sin nombre"} fue seleccionado en VR!`);
    }
});


document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event){
    const coords = new THREE.Vector2(
        ( event.clientX / window.innerWidth ) * 2 - 1, 
        - ( event.clientY / window.innerHeight ) * 2 + 1, 
    )
    raycaster.setFromCamera(coords, camera)

    const interseccion = raycaster.intersectObjects(scene.children, true);
    if (interseccion.length > 0){
        const selectObject = interseccion[0].object;
        const color = new THREE.Color(Math.random(), Math.random(), Math.random())
        selectObject.material.color = color;
        console.log(`${selectObject.name} was clicked!`);
    }
}
