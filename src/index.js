const textarea = document.querySelector('.source-text')
const canvasDiv = document.querySelector('.target-canvas')
textarea.value = '随着小程序的普及，微信也有很多内部小程序在开发，每个小程序都需要从零到1进行开发设计，而这个过程中，有大量的UI交互是重复的，另外，微信内部已经有一套H5版本的WeUI样式库。综合考虑，我们基于WeUI样式库开发了小程序版本的UI组件库，在内部多个小程序项目已经使用OK的情况下，我们把这套组件库开源让外部开发者也可以使用，欢迎大家Star以及提Issue。';

const width = canvasDiv.offsetWidth
const height = 800


const app = new PIXI.Application({
  width,
  height,
  backgroundColor: 0xFFFFFF,
  resolution: window.devicePixelRatio || 1
});
canvasDiv.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);