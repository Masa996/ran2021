import { Models } from './components/models/Models.js';
import { Camera } from './components/Camera.js';
import { Lights } from './components/Lights.js';
import { Ambient } from './components/Ambient.js';

import { Controls } from './systems/Controls.js';
import { Renderer } from './systems/Renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';


import { Raycaster } from 'https://unpkg.com/three@0.127.0/src/core/Raycaster.js';
import { Vector2 } from 'https://unpkg.com/three@0.127.0/src/math/Vector2.js';



let current_scene;
let current_camera;

let mouse;
let raycaster;


class World {
  constructor(container) {
	
	current_camera=new Camera(-1.5, 1.5, 6.5);
    this.camera = current_camera.createCamera();
	
	this.renderer=new Renderer(true,true);
    this.renderer = this.renderer.createRenderer();
  
	this.scene=new Ambient('skyblue');
    this.scene = this.scene.createAmbient();
	
	
    this.loop = new Loop(this.camera, this.scene, this.renderer);
	
	this.controls =new Controls(this.camera, this.renderer.domElement);
    this.controls = this.controls.createControls();

	
	this.lights=new Lights(10,10,10);
    const { ambientLight, mainLight } = this.lights.createLights();

    this.loop.updatables.push(this.controls);
    this.scene.add(ambientLight, mainLight);
	
	mouse = new Vector2();
	raycaster = new Raycaster();

	
	this.renderer.domElement.addEventListener( 'click', onClick, false );
	
    const resizer = new Resizer(container, this.camera, this.renderer);
	
	container.append(this.renderer.domElement);

  }

  async init() {
	var paths=['https://raw.githubusercontent.com/Masa996/ran2021/main/assets/models/sonic/scene.gltf','https://raw.githubusercontent.com/Masa996/ran2021/main/assets/models/pikachu/pikachu.gltf','https://raw.githubusercontent.com/Masa996/ran2021/main/assets/models/crash/scene.gltf'];   
	var positions=[0,0,2.5, 
	7.5,0,-10,
	0,-2.5,-10];
	var animated=[false, true, false];
	var urls=['https://en.wikipedia.org/wiki/Sonic_the_Hedgehog','https://en.wikipedia.org/wiki/Pikachu','https://en.wikipedia.org/wiki/Crash_Bandicoot'];
	
	const models=new Models(paths,positions,animated,urls);  
	
    const { model1, model2, model3 } = await models.loadModels();
	
    // pomera do centra prvog objekta
    this.controls.target.copy(model1.position);	
    this.loop.updatables.push(model1);
    this.scene.add(model1, model2, model3);

	current_scene=this.scene;
	current_camera=this.camera;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}


function onClick() {
	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera(mouse, current_camera);

	var intersects = raycaster.intersectObjects(current_scene.children, true );
	//console.log(intersects[0].object.parent.parent.parent.parent.url);

	if ( intersects.length > 0 ) {
		alert('Intersects');
		//const url='http://127.0.0.1:8080/pikachu.html';
       // const url=intersects[0].object.parent.parent.parent.parent.url;	
        
		var parent_temp=intersects[0].object.parent;
	    var url=parent_temp.url;
		while(!(url!=null))
		{
			
			parent_temp=parent_temp.parent;
			url=parent_temp.url;
		}
	   
		window.location.replace(url);
	}
}

export { World };
