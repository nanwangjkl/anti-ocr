import { createSignal, createRoot } from 'solid-js'
import PRESETS from '@/js/presets'

function createConfig () {
  const [text, setText] = createSignal('为了帮助开发者简单和高效地开发和调试微信小程序，我们在原有的公众号网页调试工具的基础上，推出了全新的微信开发者工具，集成了公众号网页调试和小程序调试两种开发模式。使用公众号网页调试，开发者可以调试微信网页授权和微信JS-SDK详情使用小程序调试，开发者可以完成小程序的API和页面的开发调试、代码查看和编辑、小程序预览和发布等功能。')
  const [preset, setPreset] = createSignal(PRESETS[0])
  const [fontSize, setFontSize] = createSignal(24)
  const [lineHeight, setLineHeight] = createSignal(36)
  const [font, setFont] = createSignal('KingnamBobo-Bold')
  const [maskText, setMaskText] = createSignal('')
  const [borderWidth, setBorderWidth] = createSignal(4)
  const [maskBorder, setMaskBorder] = createSignal('')
  const [borderFilter, setBorderFilter] = createSignal('contrast')

  return { text, setText, preset, setPreset, fontSize, setFontSize, lineHeight, setLineHeight, font, setFont, maskText, setMaskText, borderWidth, setBorderWidth, maskBorder, setMaskBorder, borderFilter, setBorderFilter }
}

export default createRoot(createConfig)
