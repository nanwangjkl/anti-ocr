import * as PIXI from 'pixi.js-legacy'
import PRESET from '@/preset'

const solution = (app, {
  text = '',
  preset = '01',
  fontSize = 24,
  lineHeight = 36,
  font = 'KingnamBobo-Bold',
  maskFormat = 'horizontal'
} = {}) => {
  const { stage, renderer } = app
  const { width, height } = app.screen
  const { img, borderColor } = PRESET[preset]
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

    // 文字
    const textStyle = new PIXI.TextStyle({
      ...DEFAULT_STYLE,
      fill: '#FFFFFF',
      stroke: borderColor,
      strokeThickness: 5,
      wordWrapWidth: SECTION_WIDTH
    })
    const textMain = new PIXI.Text(text, textStyle)
    textMain.x = PADDING
    textMain.y = PADDING
    containerMain.addChild(textMain)

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

    // 文字蒙板
    const renderTexture = PIXI.RenderTexture.create({ width, height })
    const renderTextureSprite = new PIXI.Sprite(renderTexture)
    frontMain.mask = renderTextureSprite
    containerMain.addChild(renderTextureSprite)

    const textMaskStyle = new PIXI.TextStyle({
      ...DEFAULT_STYLE,
      fill: 0xffffff,
      stroke: 'rgba(0, 0, 0, 0)',
      strokeThickness: 5,
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
