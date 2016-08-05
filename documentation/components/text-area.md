# TextArea
`TextArea` is a field that accepts multiple lines of text.

```javascript
const TextAreaExample = () => (
  <Form submit={() => {}}>
    <TextArea name="textarea" value="default value" label="Text area" required />
  </Form>
);
```

## Props
- `name` (string, required): This will map to the key in the form
- `label` (string): This will be displayed near the field
- `required` (bool): Will tell the field to display a required star next to the label
- `validator` (func): a [validator](../validation/validation.md) function
- `value` (string): This is the default value of the field
