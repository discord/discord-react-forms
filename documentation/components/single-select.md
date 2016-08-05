# SingleSelect
`SingleSelect` is a dropdown component that allows you to select a value in a list of choices.

```javascript
const options = [
  {
    value: 'option-1',
    label: 'Option 1'
  },
  {
    value: 'option-2',
    label: 'Option 2'
  },
  {
    value: 'option-3'
  },
];

const SingleSelectExample = () => (
  <Form submit={() => {}}>
    <SingleSelect name="single-select" options={options} label="Single Select" />
    <SingleSelect
      name="single-select-placeholder"
      options={options}
      label="Single Select"
      placeholder="placeholder" />
  </Form>
);
```

## Props
- `name` (string, required): This will map to the key in the form
- `label` (string): This will be displayed near the field
- `placeholder` (string): Text to show the user before a value exists
- `options` (Array<Object>): An array of objects containing a value and a label
- `required` (bool): Will tell the field to display a required star next to the label
- `value` (string): This is the default value of the field
- `validator` (func): a [validator](../validation/validation.md) function
