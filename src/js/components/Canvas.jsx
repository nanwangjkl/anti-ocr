import { onCleanup, createEffect, Show, createResource } from 'solid-js'
import * as PIXI from 'pixi.js-legacy'
import Loading from './Loading'
import font1 from '@/../fonts/bobo.woff'
import font2 from '@/../fonts/LongCang-Regular.woff'

import PRESETS from '@/js/presets'

const loadResource = async () => {
  await PIXI.Assets.load(font1)
  await PIXI.Assets.load(font2)
  const resources = {}
  for (const preset of PRESETS) {
    resources[preset.img] = await PIXI.Assets.load(preset.img)
  }
  return resources
}

const Canvas = (props) => {
  const [resources] = createResource(loadResource)
  let canvasDiv
  let app
  let initiated = false

  // 清除时销毁PIXI app
  onCleanup(() => {
    if (app) {
      app.destroy()
    }
  })

  // 每次更新时重绘
  createEffect(async () => {
    // 资源未加载，不绘制
    if (!resources()) {
      return
    }

    // 资源已经加载，初始化
    if (!initiated) {
      initiated = true
      const width = canvasDiv.offsetWidth
      app = new PIXI.Application({
        width,
        height: 200,
        backgroundColor: 0xfaebd7,
        resolution: window.devicePixelRatio || 1,
        resizeTo: canvasDiv
      })
      canvasDiv.appendChild(app.view)
    }

    const text = props.text()
    const preset = props.preset()
    const fontSize = props.fontSize()
    const lineHeight = props.lineHeight()
    const font = props.font()
    const maskText = props.maskText()
    const borderWidth = props.borderWidth()
    const maskBorder = props.maskBorder()
    const borderFilter = props.borderFilter()

    // 绘制
    const { stage, renderer } = app
    const { width, height } = app.screen
    stage.removeChildren()
    const container = new PIXI.Container()

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
    const bgdMain = PIXI.Sprite.from(preset.img)
    bgdMain.width = width
    bgdMain.height = height
    containerMain.addChild(bgdMain)

    // 添加反色文字
    const textMain = PIXI.Sprite.from(preset.img)
    textMain.width = width
    textMain.height = height
    switch (maskBorder) {
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

    // 文字滤镜
    const filter = new PIXI.ColorMatrixFilter()
    switch (borderFilter) {
      case 'contrast':
        filter.contrast(2, true)
        break
      case 'brightness':
        filter.brightness(2, true)
        break
      case 'negative':
        filter.negative(true)
        break
      case 'technicolor':
        filter.technicolor(true)
        break
      case 'toBGR':
        filter.toBGR(true)
        break
      case 'lsd':
        filter.lsd(true)
        break
      default:
        break
    }
    textMain.filters = [filter]

    // containerMain.addChild(textInvert)

    // 文字的前景
    const frontMain = PIXI.Sprite.from(preset.img)
    frontMain.width = width
    frontMain.height = height
    switch (maskText) {
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
  })

  const onDownloadClick = () => {
    app.renderer.extract.canvas(app.stage).toBlob(b => {
      const a = document.createElement('a')
      document.body.append(a)
      a.download = 'screenshot'
      a.href = URL.createObjectURL(b)
      a.click()
      a.remove()
    }, 'image/png')
  }

  return (
    <Show when={!resources.loading} fallback={<Loading />}>
      <div ref={canvasDiv} className='target-canvas border rounded overflow-hidden'>
        <img src={PRESETS[0].img} alt={PRESETS[0].name} />
      </div>
      <div className='text-end mt-3'>
        <button className='btn btn-primary' onClick={onDownloadClick}>下载图片</button>
      </div>
    </Show>
  )
}

export default Canvas
