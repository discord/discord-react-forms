# HiddenField

This field will not be rendered to the user, but it will show up in the `Form`'s values.
Useful for including values the user doesn't need to know about.

```javascript
const Example = () => (
  <Form>
    <HiddenField name="fieldname" value="You can't see me, but I'm still there" />
  </Form>
);
```

## Props
- `name` (string, required): This will map to the key in the form
- `value` (any, required): This is the value field
