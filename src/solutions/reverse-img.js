import * as PIXI from 'pixi.js-legacy'

const solution = (app, {
  text = '',
  img = '/img/01.jpg',
  fontSize = 24,
  lineHeight = 36,
  borderWidth = 4,
  font = 'KingnamBobo-Bold',
  maskFormat = '180',
  borderFormat = 'horizontal'
} = {}) => {
  const { stage, renderer } = app
  const { width, height } = app.screen
  stage.removeChildren()
  const container = new PIXI.Container()

  const onAssetsLoaded = imgBg => {
    const DEFAULT_STYLE = {
      fontFamily: font,
      fontSize,
      lineHeight,
      whiteSpace: 'normal',
      wordWrap: true,
      breakWords: true,
      lineJoin: 'round'
    }

    stage.addChild(container)
    const PADDING = 10
    const SECTION_WIDTH = width - 2 * PADDING

    const containerMain = new PIXI.Container()

    // 画布的背景
    const bgdMain = new PIXI.Sprite(imgBg)
    bgdMain.width = width
    bgdMain.height = height
    containerMain.addChild(bgdMain)

    // 添加反色文字
    const textMain = new PIXI.Sprite(imgBg)
    textMain.width = width
    textMain.height = height
    switch (borderFormat) {
      case 'horizontal':
        textMain.anchor.x = 1
        textMain.scale.x *= -1
        break
      case 'vertical':
        textMain.anchor.y = 1
        textMain.scale.y *= -1
        break
      case '180':
        textMain.anchor.set(0.5)
        textMain.x = width / 2
        textMain.y = height / 2
        textMain.rotation = Math.PI
        break
      default:
        break
    }
    containerMain.addChild(textMain)

    // 反色文字蒙板
    const invertTexture = PIXI.RenderTexture.create({ width, height })
    const invertTextureSprite = new PIXI.Sprite(invertTexture)
    textMain.mask = invertTextureSprite
    containerMain.addChild(invertTextureSprite)

    const textInvertStyle = new PIXI.TextStyle({
      ...DEFAULT_STYLE,
      fill: 0xffffff,
      stroke: 0xffffff,
      strokeThickness: borderWidth,
      wordWrapWidth: SECTION_WIDTH
    })
    const textInvert = new PIXI.Text(text, textInvertStyle)
    textInvert.x = PADDING
    textInvert.y = PADDING

    renderer.render(textInvert, {
      renderTexture: invertTexture,
      clear: false,
      skipUpdateTransform: false
    })

    // containerMain.addChild(textInvert)

    // 文字的前景
    const frontMain = new PIXI.Sprite(imgBg)
    frontMain.width = width
    frontMain.height = height
    switch (maskFormat) {
      case 'horizontal':
        frontMain.anchor.x = 1
        frontMain.scale.x *= -1
        break
      case 'vertical':
        frontMain.anchor.y = 1
        frontMain.scale.y *= -1
        break
      case '180':
        frontMain.anchor.set(0.5)
        frontMain.x = width / 2
        frontMain.y = height / 2
        frontMain.rotation = Math.PI
        break
      default:
        break
    }
    containerMain.addChild(frontMain)

    // 文字滤镜
    // const filter = new PIXI.ColorMatrixFilter()
    // filter.contrast(0.8)
    // frontMain.filters = [filter]

    // 文字蒙板
    const renderTexture = PIXI.RenderTexture.create({ width, height })
    const renderTextureSprite = new PIXI.Sprite(renderTexture)
    frontMain.mask = renderTextureSprite
    containerMain.addChild(renderTextureSprite)

    const textMaskStyle = new PIXI.TextStyle({
      ...DEFAULT_STYLE,
      fill: 0xffffff,
      stroke: 0x000000,
      strokeThickness: borderWidth,
      wordWrapWidth: SECTION_WIDTH
    })
    const textMask = new PIXI.Text(text, textMaskStyle)
    textMask.x = PADDING
    textMask.y = PADDING

    // 绘制文字蒙板
    renderer.render(textMask, {
      renderTexture,
      clear: false,
      skipUpdateTransform: false
    })

    container.addChild(containerMain)
  }

  PIXI.Assets.load(img).then(onAssetsLoaded)
}
export default solution
