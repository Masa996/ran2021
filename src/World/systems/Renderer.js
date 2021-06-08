import { WebGLRenderer } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

class Renderer {
	constructor(antialiasing, light_correct)
	{
		this.antialiasing=antialiasing;
		this.light_correct=light_correct;
		this.webglr=new WebGLRenderer({ antialias: antialiasing });
		this.webglr.physicallyCorrectLights = light_correct;

	}	
	  
	createRenderer() {
		const r= this.webglr;
		return r;
	}
}
export { Renderer };
