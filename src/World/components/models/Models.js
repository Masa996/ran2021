import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

import { AnimationMixer } from 'https://unpkg.com/three@0.127.0/build/three.module.js';




class Models {
	
	constructor(paths,positions,animated,urls)
	{
		this.paths=paths;
		this.positions=positions;
		this.animated=animated;	
		this.urls=urls;
	}
	
	setupModel(data) {
	  const model = data.scene.children[0];
	  const clip = data.animations[0];

	  if(clip!=null)
	  {
		  const mixer = new AnimationMixer(model);
		  const action = mixer.clipAction(clip);
		  action.play();

		  model.tick = (delta) => mixer.update(delta);
	  }
	  
	  return model;

	}
	
	async loadModels() {
	  const loader = new GLTFLoader();

	  const [model1_data, model2_data, model3_data] = await Promise.all([
		loader.loadAsync(this.paths[0]),
		loader.loadAsync(this.paths[1]),
		loader.loadAsync(this.paths[2]),
	  ]);


	  const model1 = this.setupModel(model1_data);
	  model1.position.set(this.positions[0], this.positions[1], this.positions[2]);
	  model1.name="model1";
	  model1.url=this.urls[0];
	  
	  
	  const model2 = this.setupModel(model2_data);
   	  model2.position.set(this.positions[3], this.positions[4], this.positions[5]);
	  model2.name="model2";	
	  model2.url=this.urls[1];
	
		
	  const model3 = this.setupModel(model3_data);
      model3.position.set(this.positions[6], this.positions[7], this.positions[8]);
	  model3.name="model3";
	  model3.url=this.urls[2];
	  model3.scale.set(0.05,0.05,0.05);


	  return {
		model1,
		model2,
		model3,
	  };
	}
}
export { Models };
