// import img101 from "src/assets/scene1/img-01.png"
// import img102 from "src/assets/scene1/img-02.png"
// import img103 from "src/assets/scene1/img-03.png"
// import img104 from "src/assets/scene1/img-04.png"
// import img105 from "src/assets/scene1/img-05.png"
// import img106 from "src/assets/scene1/img-06.png"
// import img107 from "src/assets/scene1/img-07.png"
// import img108 from "src/assets/scene1/img-08.png"

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  let scene1img = importAll(require.context('src/assets/scene1', false, /\.(png|jpe?g|svg)$/));
  let scene2img = importAll(require.context('src/assets/scene2', false, /\.(png|jpe?g|svg)$/));
  let scene3img = importAll(require.context('src/assets/scene3', false, /\.(png|jpe?g|svg)$/));

export{
    scene1img,scene2img,scene3img
}