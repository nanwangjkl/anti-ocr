import COLORS from '../color'

const solution = (app, {
  text = '',
  fontSize = 24,
  lineHeight = 36,
  strength = 'low',
  color = 'blue'
} = {}) => {
  const { stage, renderer } = app
  const { width, height } = app.screen
  const colorSet = COLORS[color]
  const DEFAULT_STYLE = {
    fontFamily: 'Long_Cang',
    fontSize,
    lineHeight: lineHeight,
    whiteSpace: 'normal',
    wordWrap: true,
    breakWords: true,
    lineJoin: 'round'
  }

  const container = new PIXI.Container()

  stage.addChild(container)

  const COLOR_LIGHT = colorSet.dark
  const COLOR_DARK = colorSet.light
  const PADDING = 10
  const SECTION_WIDTH = width - 2 * PADDING
  const ROTATION = strength === 'low' ? 0 : -0.3
  const LINE_DENSE = strength === 'low' ? lineHeight : 18
  const LINE_COUNT = Math.floor(height / LINE_DENSE) + 30
  const BANNER_LENGTH = strength === 'low' ? 8 : 8
  const BANNER_WIDTH = 2000

  const RANDOM_LIST = []

  for (let j = 0; j < LINE_COUNT; j++) {
    if (strength === 'low') {
      RANDOM_LIST.push([0, LINE_DENSE * j + 18])
    } else {
      RANDOM_LIST.push([0, LINE_DENSE * j + 18])
    }
  }
  const containerMain = new PIXI.Container()
  const bgdMain = new PIXI.Graphics()
    .beginFill(COLOR_DARK)
    .drawRect(0, 0, width, height)
    .endFill()
  containerMain.addChild(bgdMain)

  const textStyle = new PIXI.TextStyle({
    ...DEFAULT_STYLE,
    fill: COLOR_LIGHT,
    wordWrapWidth: SECTION_WIDTH
  })
  const textMain = new PIXI.Text(text, textStyle)
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
    ...DEFAULT_STYLE,
    fill: COLOR_DARK,
    wordWrapWidth: SECTION_WIDTH
  })
  const textRev = new PIXI.Text(text, textRevStyle)
  textRev.x = PADDING + 5
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
}
export default solution
