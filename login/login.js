import * as THREE from 'three'
import { ParametricGeometry } from 'https://unpkg.com/three@0.144.0/examples/jsm/geometries/ParametricGeometry.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

const hyperbolic = (u, v, target) =>
{
    let alpha = Math.PI * 2 * (u - 0.5)
    let theta = Math.PI * 2 * (v - 0.5)
    let t = 5
    let bottom = 1 + Math.cosh(alpha) * Math.cosh(theta)

    let x = Math.sinh(alpha) * Math.cos(t * theta) / bottom
    let y = Math.sinh(alpha) * Math.sin(t * theta) / bottom
    let z = Math.cosh(alpha) * Math.sinh(theta) / bottom
    target.set(x, y, z)
}

const material = new THREE.MeshBasicMaterial({ color: 0x6a7768, wireframe: true, side: THREE.DoubleSide })
const hHelicoid = new THREE.Mesh(
    new ParametricGeometry(hyperbolic, 50, 50),
    material
)
hHelicoid.rotation.x = Math.PI * 0.5
scene.add(hHelicoid)

const sine = (u, v, target) =>
{
    let alpha = Math.PI * 2 * (u - 0.5)
    let theta = Math.PI * 2 * (v - 0.5)
    let a = 0.6

    let x = a * Math.sin(alpha)
    let y = a * Math.cos(theta) * Math.sin(theta)
    let z = a * Math.sin(alpha + theta)

    target.set(x, y, z)
}

const sineSurface = new THREE.Mesh(
    new ParametricGeometry(sine, 60, 60),
    material
)
sineSurface.position.set(0, 4, 0)
scene.add(sineSurface)

const container = document.getElementById('container')
const sizes = { width: container.offsetWidth, height: container.offsetHeight }
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 15)
camera.position.z = 2.5
scene.add(camera)

const renderer = new THREE.WebGLRenderer(
{
    canvas,
    alpha: true,
    antialias: true
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height)

window.onresize = () =>
{
    sizes.width = container.offsetWidth
    sizes.height = container.offsetHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
}

let time = Date.now()
const tick = () =>
{
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    hHelicoid.rotation.z += deltaTime * 0.0005

    sineSurface.rotation.x += deltaTime * 0.0005
    sineSurface.rotation.y += deltaTime * 0.0005

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()

let flag = false
canvas.onclick = () =>
{
    flag == false ? (gsap.to(camera.position, { y: 4, duration: 2 }), flag = true) : (gsap.to(camera.position, { y: 0, duration: 2 }), flag = false)
}
canvas.onmouseenter = () => { cursor.classList.toggle('click') }
canvas.onmouseleave = () => { cursor.classList.toggle('click') }