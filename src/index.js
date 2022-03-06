import bannerSolution from './solutions/banner'

const form = document.querySelector('#form')
const canvasDiv = document.querySelector('.target-canvas')
const heightTemplate = document.querySelector('.height-template>pre')
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
  const color = formData.get('color')
  const strength = formData.get('strength')
  // 使用一个透明的pre决定画布高度
  heightTemplate.innerHTML = text
  const height = heightTemplate.offsetHeight
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

document.fonts.ready.then(() => {
  mainContent.hidden = false
  loadingNotice.hidden = true
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
