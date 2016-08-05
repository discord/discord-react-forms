# SubmitButton

This component will allow you to submit the `Form` easily.
When the `SubmitButton` is clicked, it tell the `Form` to submit.

```javascript
const Example = () => (
  <Form>
    <SubmitButton
      cannotSubmitText="Submit"
      cannotSubmitText="Cannot Submit"
      isSubmittingText="Is Submitting" />
  </Form>
);
```

## Props
`SubmitButton` takes three props.
Each prop tells the button what it should display depending on the form's submission state.
