import '@/scss/styles.scss'

import PRESETS from '@/js/presets'
import PresetSelect from '@/js/components/PresetSelect'
import Canvas from '@/js/components/Canvas'
import config from '@/js/stores/config'

function App () {
  const { text, setText, preset, setPreset, fontSize, setFontSize, lineHeight, setLineHeight, font, setFont, maskText, setMaskText, borderWidth, setBorderWidth, maskBorder, setMaskBorder, borderFilter, setBorderFilter } = config
  return (
    <div className='container py-4 px-3 mx-auto'>
      <div className='row g-3'>
        <div className='col-md-4'>
          <h2>反OCR生成器</h2>
          <p>这个小程序可以帮你生成无法被机器读取的图片</p>
          <div className='mb-3'>
            <label for='textareaText' className='form-label'>请输入要替换的文本</label>
            <textarea className='form-control' id='textareaText' rows='10' value={text()} onInput={e => setText(e.currentTarget.value)} />
          </div>
          <PresetSelect presets={PRESETS} selectedPreset={preset()} onPresetSelect={result => setPreset(result)} />
        </div>
        <div className='col-md-4'>
          <div className='mb-2'>
            <label for='inputFontSize' className='form-label'>文字大小</label>
            <input type='number' className='form-control' id='inputFontSize' value={fontSize()} onInput={e => setFontSize(Number(e.currentTarget.value))} />
          </div>
          <div className='mb-2'>
            <label for='inputLineHeight' className='form-label'>行高</label>
            <input type='number' className='form-control' id='inputLineHeight' value={lineHeight()} onInput={e => setLineHeight(Number(e.currentTarget.value))} />
          </div>
          <div className='mb-2'>
            <label for='selectFont' className='form-label'>字体</label>
            <select id='selectFont' className='form-select' value={font()} onChange={e => setFont(e.currentTarget.value)}>
              <option value='KingnamBobo-Bold'>波波黑</option>
              <option value='Long_Cang'>龙藏体</option>
            </select>
          </div>
          <div className='mb-2'>
            <label for='selectMaskText' className='form-label'>文字纹理</label>
            <select id='selectMaskText' className='form-select' value={maskText()} onChange={e => setMaskText(e.currentTarget.value)}>
              <option value='horizontal'>背景水平翻转</option>
              <option value='vertical'>背景垂直翻转</option>
              <option value='180'>背景旋转180度</option>
              <option value=''>原始背景</option>
            </select>
          </div>
          <div className='mb-2'>
            <label for='inputBorderSize' className='form-label'>文字描边宽度</label>
            <input type='number' className='form-control' id='inputBorderSize' value={borderWidth()} onInput={e => setBorderWidth(Number(e.currentTarget.value))} />
          </div>
          <div className='mb-2'>
            <label for='selectMaskBorder' className='form-label'>文字描边纹理</label>
            <select id='selectMaskBorder' className='form-select' value={maskBorder()} onChange={e => setMaskBorder(e.currentTarget.value)}>
              <option value='horizontal'>背景水平翻转</option>
              <option value='vertical'>背景垂直翻转</option>
              <option value='180'>背景旋转180度</option>
              <option value=''>原始背景</option>
            </select>
          </div>
          <div className='mb-2'>
            <label for='selectBorderFilter' className='form-label'>文字描边滤镜</label>
            <select id='selectBorderFilter' className='form-select' value={borderFilter()} onChange={e => setBorderFilter(e.currentTarget.value)}>
              <option value=''>无滤镜</option>
              <option value='contrast'>高对比度</option>
              <option value='brightness'>变亮</option>
              <option value='negative'>反色</option>
              <option value='technicolor'>特艺色</option>
              <option value='toBGR'>BGR</option>
              <option value='lsd'>LSD</option>
            </select>
          </div>
        </div>
        <div className='col-md-4'>
          <Canvas />
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

export default App
