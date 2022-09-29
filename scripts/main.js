document.documentElement.classList.toggle('menu-active')

if (history.scrollRestoration)
{
    history.scrollRestoration = 'manual'
}
else
{
    window.onbeforeunload = function()
    {
        window.scrollTo(0, 0)
    }
}

import * as THREE from 'three'
import { GLTFLoader } from 'https://unpkg.com/three@0.144.0/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'https://unpkg.com/three@0.144.0/examples/jsm/loaders/DRACOLoader.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const gltfLoader = new GLTFLoader()

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/')
gltfLoader.setDRACOLoader(dracoLoader)

let center = new THREE.Vector3()
let obj
gltfLoader.load('./scripts/obj.glb', (glb) =>
{
    obj = glb.scene
    obj.traverse((child) =>
    {
        if(child.isMesh === true)
        {
            child.material.envMap = new THREE.CubeTextureLoader()
            .setPath('./scripts/cubemap/')
            .load([ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ])
            child.material.roughness = 0.12
            child.material.metalness = 0.15
            child.geometry.computeBoundingBox()
            child.geometry.boundingBox.getCenter(center)
            child.geometry.center()
            child.position.copy(center)
        }
        if(child.name == 'Plane001')
        {
            child.children[0].material.color.set(0x080808)
        }
    })
    obj.scale.set(0.15, 0.15, 0.15)
    obj.position.y = -0.2
    obj.rotation.y = Math.PI * -0.5
    scene.add(obj)
})

const sizes = { width: screen.availWidth, height: screen.availHeight }
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 50)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height)

window.onresize = () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
}

let mouse = new THREE.Vector2()
window.addEventListener('mousemove', (mm) =>
{
    mouse.x = mm.clientX / sizes.width * 2 - 1
    mouse.y = - (mm.clientY / sizes.height) * 2 + 1
})

const tick = () =>
{
    if(obj)
    {
        obj.rotation.y = lerp(obj.rotation.y, mouse.x * 0.5 - Math.PI * 0.5, 0.07)
        obj.rotation.z = lerp(obj.rotation.z, mouse.y * 0.5 - Math.PI * 2, 0.07)
    }
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

const faqItem = document.querySelectorAll('.faq-item')
faqItem.forEach(item => { item.onclick = () => { item.classList.toggle('opened') } })

function reverseComplete(){ document.documentElement.classList.toggle('menu-active') }

const loadingTl = gsap.timeline({onReverseComplete: reverseComplete })

function animationSteps()
{
    loadingTl.to('.intro-wrapper-logo h1', { y: 0, rotate: 0, duration: 0.8 }, '<')
    .add(() => { loadingTl.reverse() }, '+=1')
    gsap.to('.intro-wrapper img', { clipPath: 'inset(50% 0% 50% 0%)', delay: 4 })
    gsap.to('.intro-wrapper', { bottom: '100%', delay: 4.8 })
}

const mediaQuery = window.matchMedia('( max-width: 520px )')
if(mediaQuery.matches)
{
    loadingTl.to('.intro-wrapper div:not(:first-child) h1', { clipPath: 'inset(0%)', duration: 0.2 })
    .to('.intro-wrapper div:nth-child(2)', { top: '45%', duration: 0.6 }, '<')
    .to('.intro-wrapper div:nth-child(3)', { top: '55%', duration: 0.6 }, '<')
    animationSteps()
}
else
{
    loadingTl.to('.intro-wrapper div:not(:first-child) h1', { clipPath: 'inset(0%)', duration: 0.2 })
    .to('.intro-wrapper img', { clipPath: 'inset(32% 15% 32% 15%)', duration: 0.6 })
    .to('.intro-wrapper div:nth-child(2)', { top: '40%', duration: 0.6 }, '<')
    .to('.intro-wrapper div:nth-child(3)', { top: '60%', duration: 0.6 }, '<')
    animationSteps()
}