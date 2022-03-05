import bannerSolution from './solutions/banner'

const form = document.querySelector('#form')
const canvasDiv = document.querySelector('.target-canvas')
const downloadBtn = document.querySelector('#download')

const FONT_SIZE = 24
const LINE_HEIGHT = 36
const PADDING = 10

const width = canvasDiv.offsetWidth
const app = new PIXI.Application({
  width,
  height: 200,
  backgroundColor: 0xfaebd7,
  resolution: window.devicePixelRatio || 1,
  resizeTo: canvasDiv
})
canvasDiv.appendChild(app.view)

form.addEventListener('submit', event => {
  event.preventDefault()
  const formData = new window.FormData(form)
  const text = formData.get('text')
  const color = formData.get('color')
  const strength = formData.get('strength')
  const LINE_LENGTH = Math.floor((width - PADDING * 2) / FONT_SIZE)
  const height = Math.floor(2 + text.length / LINE_LENGTH) * LINE_HEIGHT
  canvasDiv.style.height = `${height}px`
  app.stage.removeChildren()
  app.resize()
  bannerSolution(app, { text, color, strength, fontSize: FONT_SIZE, lineHeight: LINE_HEIGHT })
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
