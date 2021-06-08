import { PerspectiveCamera } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

class Camera{
	
	constructor(x,y,z)
	{
		this.x=x;
		this.y=y;
		this.z=z;		
		this.camera = new PerspectiveCamera(35, 1, 0.1, 100);
		this.camera.position.set(x,y,z);

	}
	createCamera() {
		this.camera.position.set(this.x,this.y,this.z);
		const camera=this.camera;	
		return camera;
	}
}
export { Camera };
