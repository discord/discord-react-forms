# TextInput
`TextInput` is a field that accepts one line of text.

```javascript
const TextInputExample = () => (
  <Form submit={() => {})}>
    <TextInput placeholder="Hello, World!" name="hello" />
    <TextInput
      placeholder="default value" value="This is a default value" name="hello2" />
  </Form>
);
```

## Props
- `name` (string, required): This will map to the key in the form
- `label` (string): This will be displayed near the field
- `placeholder` (string): Text to show the user before a value exists
- `required` (bool): Will tell the field to display a required star next to the label
- `validator` (func): a [validator](../validation/validation.md) function
- `value` (string): This is the default value of the field
