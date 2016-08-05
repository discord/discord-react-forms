# Checkbox

This is a basic true/false component.

```javascript
const Example = () => (
  <Form>
    <Checkbox name="checkbox" label="Check me" />
  </Form>
);
```

## Props
- `name` (string, required): This will map to the key in the form
- `label` (string): This will be displayed next to the checkbox
- `value` (bool): This is the default value of the checkbox
