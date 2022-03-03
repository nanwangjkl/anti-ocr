const textarea = document.querySelector('.source-text')
const canvasDiv = document.querySelector('.target-canvas')
textarea.value = '随着小程序的普及，微信也有很多内部小程序在开发，每个小程序都需要从零到1进行开发设计，而这个过程中，有大量的UI交互是重复的，另外，微信内部已经有一套H5版本的WeUI样式库。综合考虑，我们基于WeUI样式库开发了小程序版本的UI组件库，在内部多个小程序项目已经使用OK的情况下，我们把这套组件库开源让外部开发者也可以使用，欢迎大家Star以及提Issue。'

const width = canvasDiv.offsetWidth
const height = 800

const app = new PIXI.Application({
  width,
  height,
  backgroundColor: 0xfaebd7,
  resolution: window.devicePixelRatio || 1
})
canvasDiv.appendChild(app.view)
const { stage, renderer } = app

const container = new PIXI.Container()

stage.addChild(container)

const COLOR_LIGHT = 0x63a4ff
const COLOR_DARK = 0x004ba0
const FONT_SIZE = 24
const LINE_HEIGHT = 36
const PADDING = 10
const SECTION_WIDTH = width - 2 * PADDING
const ROTATION = -0.3
const LINE_LENGTH = Math.floor(SECTION_WIDTH / FONT_SIZE)
const LINE_COUNT = Math.floor(height / FONT_SIZE)
const BANNER_LENGTH = 8
const BANNER_WIDTH = 500

const RANDOM_LIST = []

for (let j = 0; j < LINE_COUNT; j++) {
  RANDOM_LIST.push([0, 18 * j + 18])
}
const containerMain = new PIXI.Container()
const bgdMain = new PIXI.Graphics()
  .beginFill(COLOR_DARK)
  .drawRect(0, 0, width, height)
  .endFill()
containerMain.addChild(bgdMain)

const textStyle = new PIXI.TextStyle({
  fontSize: FONT_SIZE,
  lineHeight: LINE_HEIGHT,
  fill: COLOR_LIGHT,
  whiteSpace: 'normal',
  wordWrap: true,
  breakWords: true,
  wordWrapWidth: SECTION_WIDTH,
  lineJoin: 'round'
})
const textMain = new PIXI.Text(textarea.value, textStyle)
textMain.x = PADDING
textMain.y = PADDING
containerMain.addChild(textMain)
container.addChild(containerMain)

// 添加filter
const containerMask = new PIXI.Container()
const maskBgd = new PIXI.Graphics()
  .beginFill(0xFF0000)
  .drawRect(0, 0, width, height)
  .endFill()
containerMask.addChild(maskBgd)

for (const position of RANDOM_LIST) {
  const banner = new PIXI.Graphics()
    .beginFill(0x000000)
    .drawRect(0, 0, BANNER_WIDTH, BANNER_LENGTH)
    .endFill()
  banner.rotation = ROTATION
  banner.position.set(...position)
  containerMask.addChild(banner)
}

containerMask.filters = [new PIXI.filters.AlphaFilter()]
const bounds = new PIXI.Rectangle(0, 0, width, height)
const texture = renderer.generateTexture(containerMask, PIXI.SCALE_MODES.NEAREST, 1, bounds)

const mask = new PIXI.Sprite(texture)
container.addChild(mask)
containerMain.mask = mask

// 添加反向文字
const containerRev = new PIXI.Container()
const bgdRev = new PIXI.Graphics()
  .beginFill(COLOR_LIGHT)
  .drawRect(0, 0, width, height)
  .endFill()
containerRev.addChild(bgdRev)

const textRevStyle = new PIXI.TextStyle({
  fontSize: FONT_SIZE,
  lineHeight: LINE_HEIGHT,
  fill: COLOR_DARK,
  whiteSpace: 'normal',
  wordWrap: true,
  breakWords: true,
  wordWrapWidth: SECTION_WIDTH,
  lineJoin: 'round'
})
const textRev = new PIXI.Text(textarea.value, textRevStyle)
textRev.x = PADDING + 4
textRev.y = PADDING
containerRev.addChild(textRev)
container.addChild(containerRev)

// 添加反向Filter
const containerMaskRev = new PIXI.Container()
for (const position of RANDOM_LIST) {
  const bannerRev = new PIXI.Graphics()
    .beginFill(0xFF0000)
    .drawRect(0, 0, BANNER_WIDTH, BANNER_LENGTH)
    .endFill()
  bannerRev.rotation = ROTATION
  bannerRev.position.set(...position)
  containerMaskRev.addChild(bannerRev)
}

containerMaskRev.filters = [new PIXI.filters.AlphaFilter()]
const boundsRev = new PIXI.Rectangle(0, 0, width, height)
const textureRev = renderer.generateTexture(containerMaskRev, PIXI.SCALE_MODES.NEAREST, 1, boundsRev)

const maskRev = new PIXI.Sprite(textureRev)
container.addChild(maskRev)
containerRev.mask = maskRev

const canvas = app.view
document.querySelector('#download').onclick = () => {
  const data = canvas.toDataURL()
  // const prev = window.location.href
  window.location.href = data.replace('image/png', 'image/octet-stream')
  window.location.href = data
}
