const textarea = document.querySelector('.source-text')
const canvasDiv = document.querySelector('.target-canvas')
textarea.value = '随着小程序的普及，微信也有很多内部小程序在开发，每个小程序都需要从零到1进行开发设计，而这个过程中，有大量的UI交互是重复的，另外，微信内部已经有一套H5版本的WeUI样式库。综合考虑，我们基于WeUI样式库开发了小程序版本的UI组件库，在内部多个小程序项目已经使用OK的情况下，我们把这套组件库开源让外部开发者也可以使用，欢迎大家Star以及提Issue。'

const width = canvasDiv.offsetWidth
const height = 800

const app = new PIXI.Application({
  width,
  height,
  backgroundColor: 0x1976d2,
  resolution: window.devicePixelRatio || 1
})
canvasDiv.appendChild(app.view)
const { stage, renderer } = app

const container = new PIXI.Container()

stage.addChild(container)

const BLEND_MODE = PIXI.BLEND_MODES.XOR

const COLOR_SOURCE = 0x63a4ff
const TEXTURE_SOURCE = PIXI.RenderTexture.create({ width, height, resolution: renderer.resolution })

const COLOR_DESTINATION = 0x004ba0
const TEXTURE_DESTINATION = PIXI.RenderTexture.create({ width, height, resolution: renderer.resolution })

const FONT_SIZE = 20
const PADDING = 10
const SECTION_WIDTH = width - 2 * PADDING
const LINE_LENGTH = Math.floor(SECTION_WIDTH / FONT_SIZE)
const LINE_COUNT = Math.floor(height / FONT_SIZE)

const textStyle = new PIXI.TextStyle({
  fontSize: FONT_SIZE,
  fill: COLOR_DESTINATION,
  whiteSpace: 'normal',
  wordWrap: true,
  breakWords: true,
  wordWrapWidth: SECTION_WIDTH,
  lineJoin: 'round'
})

renderer.render(
  new PIXI.Text(textarea.value, textStyle),
  { renderTexture: TEXTURE_DESTINATION }
)

if (renderer.framebuffer) {
  renderer.framebuffer.blit()
}

for (let i = 0; i < LINE_LENGTH; i++) {
  for (let j = 0; j < LINE_COUNT; j++) {
    renderer.render(
      new PIXI.Graphics()
        .beginFill(COLOR_SOURCE, 0.3)
        .drawRect(FONT_SIZE * (i + Math.random()), FONT_SIZE * (j + Math.random()), 5, 30),
      { renderTexture: TEXTURE_SOURCE }
    )
  }
}

const destination = container.addChild(new PIXI.Sprite(TEXTURE_DESTINATION))
const source = container.addChild(new PIXI.Sprite(TEXTURE_SOURCE))
source.blendMode = BLEND_MODE
// source.setTransform(0, 0, 1, 1, 0.5)

source.position.set(PADDING, PADDING)
destination.position.set(PADDING, PADDING)

// 添加混淆blend
