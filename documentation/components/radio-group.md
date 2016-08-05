# RadioGroup
`RadioGroup` is a group of radio buttons where only one can be active at a time.

```javascript
const radioGroupOptions = [
  {value: 'radio-group-1', label: 'Radio group 1'},
  {value: 'radio-group-2', label: 'Radio group 2'}
];

const RadioGroupExample = () => (
  <Form submit={() => {}}>
    <RadioGroup
      name="radio-group-1" label="Radio group" options={radioGroupOptions} />
    <RadioGroup
      name="radio-group-2" label="Radio group with default value"
      options={radioGroupOptions} value="radio-group-2" />
  </Form>
);
```

## Props
- `name` (string, required): This will map to the key in the form
- `label` (string): This will be displayed above the radios
- `options` (Array<Object>): An array of objects containing a value and a label,
- `required` (bool): Will tell the field to display a required star next to the label
- `validator` (func): a [validator](../validation/validation.md) function,
- `value` (string): This is the default value of the field
