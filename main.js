import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';


// Create a scene, camera, and renderer
document.getElementById('gallery').style.top = String(window.innerHeight*3/2)+'px';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0);

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('gallery').appendChild(renderer.domElement);

const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
pointLight.position.set(0, 10,-4);
scene.add(pointLight);

const icoGeometry = new THREE.IcosahedronGeometry(0.4,0);
const cubeMat = new THREE.MeshPhysicalMaterial({
    color: 0xEB695A,
    metalness: 0,
    roughness: 0,
    transmission: 0.1,
    transparent: true,
    envMapIntensity: 1,
    ior: 1.5,
	emissive: 0x222222,
});
const tc = new THREE.Mesh(icoGeometry,cubeMat)
//scene.add(tc); tc.castShadow = true; tc.receiveShadow = true;

camera.position.set( -5, 1, -10 );
camera.lookAt(0,2,0)

const controls = new OrbitControls( camera, renderer.domElement );


window.addEventListener('scroll', () => {

	const rotation = window.pageYOffset * 0.01;
	tc.rotation.y = rotation
	const secondBorder = document.getElementById('secondBorder');
	const smoothfix = document.getElementById('secEffect');
	const bp = document.getElementById('ctxSecond');
	const sch = document.getElementById('ctxThird')
	secondBorder.style.height = `${rotation*window.innerHeight/3}px`;
	secondBorder.style.width = `${rotation*window.innerWidth/3}px`;
	secondBorder.style.top = `calc(50% - ${rotation*window.innerHeight /6}px)`;
	secondBorder.style.left = `calc(50% - ${rotation*window.innerWidth /6}px)`;
	secondBorder.style.transform=`rotate( ${rotation*2}deg)`

	const secondB = document.getElementById('secondBorderBorder');
	if(rotation >= 2.4 && rotation <= 64){
		secondB.style.opacity='1'
		secondB.style.height='96vh';
		secondB.style.top = '2vh'
		document.getElementById('hdbanner').style.top= '-24px'
	} else {
		secondBorder.style.background='#000000'

		secondB.style.height='0vw';
		secondB.style.top = '50vh'
		secondB.style.opacity='0'
	}
  
	if(rotation >= 4.8 && rotation <=60){
		secondB.style.width='96vw';
		secondB.style.left = '2vh'
	} else {
		secondB.style.width='0vw';
		secondB.style.left = '50vw'
		smoothfix.style.opacity = 0;
		bp.style.opacity = 0;
	}

	if(rotation >= 6 && rotation <=58){
		smoothfix.style.opacity = 1;
		secondBorder.style.background='#00d4ff'
		if (rotation< 12){bp.style.opacity = 1;} else {bp.style.opacity = 0;}
		sch.style.opacity = 0;
	}

	if(rotation >= 12 && rotation <=50){
		secondBorder.style.background='rgb(235,105,90)'
		if (rotation< 18){sch.style.opacity = 1;} else {sch.style.opacity = 0;}
		
	}

  });

  const canvas = document.getElementById('boundaries')
  const c = canvas.getContext('2d')
  
  let mouseX
  let mouseY
  
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height
  
  const maxRadius = 35
  
  window.onmousemove = function(e) {
	  mouseX = e.clientX
	  mouseY = e.clientY
  }
  
  window.addEventListener('resize', function() {
	  canvas.width = window.innerWidth
	  canvas.height = window.innerHeight
  })
  
  function Circle(xCoordinate, yCoordinate, radius) {
	  const randomNumber = Math.floor(Math.random() * 4)
	  const randomTrueOrFalse = Math.floor(Math.random() * 2)
  
	  this.xCoordinate = xCoordinate
	  this.yCoordinate = yCoordinate
	  this.radius = radius
	  this.color = colorArray[randomNumber]
  
	  if (randomTrueOrFalse == 1) {
		  this.xVelocity = -Math.random() * 1
	  } else {
		  this.xVelocity = Math.random() * 1
	  }
  
	  if (randomTrueOrFalse == 1) {
		  this.yVelocity = -Math.random() * 1
	  } else {
		  this.yVelocity = Math.random() * 1
	  }
  
	  // As distance gets closer to 0, increase radius
  
	  this.update = function() {
		  this.xCoordinate += this.xVelocity
		  const xDistance = mouseX - this.xCoordinate
		  const yDistance = mouseY - this.yCoordinate
		  const originalRadius = radius
		  this.yCoordinate += this.yVelocity
  
		  // Movement Functions
		  if (
			  this.xCoordinate + this.radius > canvasWidth ||
			  this.xCoordinate - this.radius < 0
		  ) {
			  this.xVelocity = -this.xVelocity
		  }
		  if (
			  this.yCoordinate + this.radius > canvasHeight ||
			  this.yCoordinate - this.radius < 0
		  ) {
			  this.yVelocity = -this.yVelocity
		  }
  
		  // Radius Decrease Functions
		  // When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35
		  if (
			  xDistance < 50 &&
			  xDistance > -50 &&
			  this.radius < maxRadius &&
			  yDistance < 50 &&
			  yDistance > -50
		  ) {
			  this.radius += 2
		  } else if (
			  (xDistance >= 50 && originalRadius < this.radius) ||
			  (xDistance <= -50 && originalRadius < this.radius) ||
			  (yDistance >= 50 && originalRadius < this.radius) ||
			  (yDistance <= -50 && originalRadius < this.radius)
		  ) {
			  this.radius -= 2
		  }
  
		  this.draw()
	  }
  
	  this.draw = function() {
		  c.beginPath()
		  c.arc(
			  this.xCoordinate,
			  this.yCoordinate,
			  Math.abs(this.radius),
			  0,
			  Math.PI * 2
		  )
		  c.fillStyle = this.color
		  c.fill()
	  }
  }
  
  const colorArray = ['rgba(235,105,90,1)', 'rgba(233,132,98,1)', 'rgba(99,112,185,1)', 'rgba(161,100,153,1)']
  const myCircle = new Circle(30, 80, 10)
  let circleArray = []
  
  for (let i = 0; i < 800; i++) {
	  const randomXCoordinate = Math.random() * canvasWidth
	  const randomYCoordinate = Math.random() * canvasHeight
	  const randomRadius = Math.random() * 5
	  circleArray.push(
		  new Circle(randomXCoordinate, randomYCoordinate, randomRadius)
	  )
  }

function animate() {
	
	c.clearRect(0, 0, canvasWidth, canvasHeight)
    myCircle.update()
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }

	controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();