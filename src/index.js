import bannerSolution from './solutions/banner'

const form = document.querySelector('#form')
const canvasDiv = document.querySelector('.target-canvas')
const downloadBtn = document.querySelector('#download')

const FONT_SIZE = 24
const LINE_HEIGHT = 36
const PADDING = 10
let app

const destroy = () => {
  if (app) {
    app.destroy()
    canvasDiv.replaceChildren()
  }
}
form.addEventListener('submit', event => {
  event.preventDefault()
  destroy()
  const formData = new window.FormData(form)
  const text = formData.get('text')
  const color = formData.get('color')
  const strength = formData.get('strength')
  const width = canvasDiv.offsetWidth
  const LINE_LENGTH = Math.floor((width - PADDING * 2) / FONT_SIZE)
  const height = Math.floor(2 + text.length / LINE_LENGTH) * LINE_HEIGHT
  app = new PIXI.Application({
    width,
    height,
    backgroundColor: 0xfaebd7,
    resolution: window.devicePixelRatio || 1
  })
  canvasDiv.appendChild(app.view)
  bannerSolution(app, { text, color, strength, fontSize: FONT_SIZE, lineHeight: LINE_HEIGHT })
})

// const canvas = app.view
downloadBtn.onclick = event => {
  event.preventDefault()
  // const data = canvas.toDataURL()
  // // const prev = window.location.href
  // window.location.href = data.replace('image/png', 'image/octet-stream')
  // window.location.href = data
}
