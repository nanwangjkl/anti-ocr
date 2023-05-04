import '@/scss/styles.scss'
import { render } from 'solid-js/web'
import { createSignal } from 'solid-js'

import PRESETS from '@/js/presets'
import PresetSelect from '@/js/components/PresetSelect'
import Canvas from '@/js/components/Canvas'

function App () {
  const [text, setText] = createSignal('为了帮助开发者简单和高效地开发和调试微信小程序，我们在原有的公众号网页调试工具的基础上，推出了全新的微信开发者工具，集成了公众号网页调试和小程序调试两种开发模式。使用公众号网页调试，开发者可以调试微信网页授权和微信JS-SDK详情使用小程序调试，开发者可以完成小程序的API和页面的开发调试、代码查看和编辑、小程序预览和发布等功能。')
  const [preset, setPreset] = createSignal(PRESETS[0])
  const [fontSize, setFontSize] = createSignal(24)
  const [lineHeight, setLineHeight] = createSignal(36)
  const [font, setFont] = createSignal('KingnamBobo-Bold')
  const [maskText, setMaskText] = createSignal('')
  const [maskBorder, setMaskBorder] = createSignal('180')
  return (
    <div className='container py-4 px-3 mx-auto'>
      <div className='row g-3'>
        <div className='col-md-4'>
          <h2>反爬虫</h2>
          <div className='mb-3'>
            <label for='textareaText' className='form-label'>请输入要替换的文本</label>
            <textarea className='form-control' id='textareaText' rows='10' value={text()} onInput={e => setText(e.currentTarget.value)} />
          </div>
          <PresetSelect presets={PRESETS} selectedPreset={preset()} onPresetSelect={result => setPreset(result)} />
        </div>
        <div className='col-md-4'>
          <div className='mb-3'>
            <label for='inputFontSize' className='form-label'>文字大小</label>
            <input type='number' className='form-control' id='inputFontSize' value={fontSize()} onInput={e => setFontSize(Number(e.currentTarget.value))} />
          </div>
          <div className='mb-3'>
            <label for='inputLineHeight' className='form-label'>行高</label>
            <input type='number' className='form-control' id='inputLineHeight' value={lineHeight()} onInput={e => setLineHeight(Number(e.currentTarget.value))} />
          </div>
          <div className='mb-3'>
            <label for='selectFont' className='form-label'>字体</label>
            <select id='selectFont' className='form-select' value={font()} onChange={e => setFont(e.currentTarget.value)}>
              <option value='KingnamBobo-Bold'>波波黑</option>
              <option value='Long_Cang'>龙藏体</option>
            </select>
          </div>
          <div className='mb-3'>
            <label for='selectMaskText' className='form-label'>文字纹理</label>
            <select id='selectMaskText' className='form-select' value={maskText()} onChange={e => setMaskText(e.currentTarget.value)}>
              <option value='horizontal'>背景水平翻转</option>
              <option value='vertical'>背景垂直翻转</option>
              <option value='180'>背景旋转180度</option>
              <option value=''>原始背景</option>
            </select>
          </div>
          <div className='mb-3'>
            <label for='selectMaskBorder' className='form-label'>文字描边纹理</label>
            <select id='selectMaskBorder' className='form-select' value={maskBorder()} onChange={e => setMaskBorder(e.currentTarget.value)}>
              <option value='horizontal'>背景水平翻转</option>
              <option value='vertical'>背景垂直翻转</option>
              <option value='180'>背景旋转180度</option>
              <option value=''>原始背景</option>
            </select>
          </div>
        </div>
        <div className='col-md-4'>
          <Canvas
            text={text}
            preset={preset}
            fontSize={fontSize}
            lineHeight={lineHeight}
            font={font}
            maskText={maskText}
            maskBorder={maskBorder}
          />
        </div>
      </div>
      <footer className='text-center my-3'>
        <p>
          项目地址: <a href='https://github.com/nanwangjkl/anti-ocr.git' target='_blank' rel='noreferrer'>github.com/nanwangjkl/anti-ocr.git</a>
        </p>
      </footer>
    </div>
  )
}

const dispose = render(() => <App />, document.getElementById('app'))

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(dispose)
}
