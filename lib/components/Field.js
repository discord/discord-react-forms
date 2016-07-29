interface Field {
  value?: any,
  options?: Array<any>,
  validator?: func,
  required: bool,
  hasDefaultValue: bool,
  hasBeenTouched: bool,
  error?: string
}
