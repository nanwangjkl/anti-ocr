import PresetOption from './PresetOption'
import { mergeProps, For } from 'solid-js'

/*
  * PresetSelect
  * @param {Object} props
  * @param {Array} props.presets
  * @param {Function} props.onPresetSelect
  * @param {Object} props.selectedPreset
  * @returns {JSX.Element}
*/
const PresetSelect = (props) => {
  const merged = mergeProps({ presets: [], onPresetSelect: () => { } }, props)
  const handlePresetSelect = preset => merged.onPresetSelect(preset)
  return (
    <>
      <label className='form-label'>效果预设</label>
      <div className='row row-cols-3 mb-3'>
        <For each={merged.presets}>
          {preset => <PresetOption key={preset.name} preset={preset} onClick={handlePresetSelect} selected={preset === merged.selectedPreset} />}
        </For>
      </div>
    </>
  )
}
export default PresetSelect
