import { Color, Scene } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

class Ambient{
	
	constructor(color)
	{
		this.scene=new Scene();
		this.color=color;
		this.scene.background=new Color(this.color);

	}
	createAmbient() {
		const ambient=this.scene;	
		return ambient;
	}
}
export { Ambient };
