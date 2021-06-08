import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

class Controls{
constructor(camera, canvas)
{
	this.camera=camera;
	this.canvas=canvas;
}	
createControls() {
	  const controls = new OrbitControls(this.camera, this.canvas);

	  controls.enableDamping = true;

	  // forward controls.update to our custom .tick method
	  controls.tick = () => controls.update();

	  return controls;
	}
}
export { Controls };
