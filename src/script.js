import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const texture = new THREE.TextureLoader()
const normalTexture = texture.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
//const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(.5,64,64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.9
material.roughness = 0.4
material.map = normalTexture;
material.color = new THREE.Color(0xf72ed0)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//another light
const pointLight2 = new THREE.PointLight(0x2959f7, 0.1)
pointLight2.position.set(-1.9,2.33,-0.71)
pointLight2.intensity = 10
scene.add(pointLight2)


/*const light1 = gui.addFolder('light1')
light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight2,'intensity').min(0).max(10).step(0.01)

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelper)*/
// light 3

const pointLight3 = new THREE.PointLight(0x2965f7, 0.1)
pointLight3.position.set(4.96,-8,-3.58);
pointLight3.intensity = 2.85

scene.add(pointLight3)

/*const light2 = gui.addFolder('light2')
light2.add(pointLight3.position, 'y').min(-8).max(8).step(0.01)
light2.add(pointLight3.position, 'x').min(-10).max(10).step(0.01)
light2.add(pointLight3.position, 'z').min(-5).max(5).step(0.01)
light2.add(pointLight3,'intensity').min(0).max(10).step(0.01)

const light2Color = {
   color: 0xf729d2
}

light2.addColor(light2Color, 'color')
    .onChange(()=> {
       pointLight3.color.set(light2Color.color)
   })*/


//const pointLightHelper1 = new THREE.PointLightHelper(pointLight3, 1)
//scene.add(pointLightHelper1)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */




document.addEventListener('mousemove' ,onDocumentMouseMove)
let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight/ 2


  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)

}

function updateSphere(event) {
  //  sphere.position.y = window.scrollY * .005
    sphere.position.y = window.scrollY * .005
}
window.addEventListener('scroll', updateSphere)




const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.position.z += .5 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
