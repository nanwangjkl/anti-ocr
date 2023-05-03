import './index.css'
import * as PIXI from 'pixi.js-legacy'
import reverseSolution from './solutions/reverse-img'
import PRESET from './preset'

const form = document.querySelector('#form')
const canvasDiv = document.querySelector('.target-canvas')
const generateBtn = document.querySelector('#generate')
const downloadBtn = document.querySelector('#download')
const mainContent = document.querySelector('#main')
const loadingNotice = document.querySelector('#loading-notice')

const FONT_SIZE = 24
const LINE_HEIGHT = 36

let app
let width

form.addEventListener('submit', event => {
  event.preventDefault()
  const formData = new window.FormData(form)
  const text = formData.get('text')
  const fontSize = Number(formData.get('fontSize'))
  const lineHeight = Number(formData.get('lineHeight'))
  const font = formData.get('font')
  const maskFormat = formData.get('maskFormat')
  const borderFormat = formData.get('borderFormat')
  const preset = formData.get('preset')
  // 生成图片
  reverseSolution(app, { text, preset, fontSize, lineHeight, font, maskFormat, borderFormat })
  downloadBtn.disabled = false
})

downloadBtn.onclick = event => {
  app.renderer.extract.canvas(app.stage).toBlob(b => {
    const a = document.createElement('a')
    document.body.append(a)
    a.download = 'screenshot'
    a.href = URL.createObjectURL(b)
    a.click()
    a.remove()
  }, 'image/png')
}

document.fonts.ready.then(() => {
  mainContent.hidden = false
  loadingNotice.hidden = true
  // 添加img元素以决定画布高度
  const imgSrc = PRESET['01'].img
  const img = document.createElement('img')
  img.src = imgSrc
  canvasDiv.appendChild(img)
  // 决定画布高度
  width = canvasDiv.offsetWidth
  app = new PIXI.Application({
    width,
    height: 200,
    backgroundColor: 0xfaebd7,
    resolution: window.devicePixelRatio || 1,
    resizeTo: canvasDiv
  })
  canvasDiv.appendChild(app.view)
})

setTimeout(() => {
  generateBtn.click()
}, 100)