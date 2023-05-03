import * as PIXI from 'pixi.js-legacy'
import PRESET from '@/preset'

const solution = (app, {
  text = '',
  preset = '01',
  fontSize = 24,
  lineHeight = 36
} = {}) => {
  const { stage, renderer } = app
  const { width, height } = app.screen
  const { img, borderColor } = PRESET[preset]
  const container = new PIXI.Container()

  stage.addChild(container)
}
export default solution
