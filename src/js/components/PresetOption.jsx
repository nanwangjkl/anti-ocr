const PresetOption = (props) => (
  <div className='form-radio-img' onClick={() => props.onClick(props.preset)}>
    <input className='form-radio-img-input' type='radio' id={`radioPreset${props.preset.name}`} name='preset' value={props.preset.name} checked={props.selected} />
    <label className='form-radio-img-label' for={`radioPreset${props.preset.name}`}>
      <img src={props.preset.img} alt={props.preset.name} />
    </label>
  </div>
)

export default PresetOption
