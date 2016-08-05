# Form

The form component will be wrapped around any other component from the library

```javascript
function submit(values, callback) {
  console.log(values);
  callback();
}

function onFieldUpdate(name, field) {
  console.log(name, field);
}

const BasicForm = () => (
  <Form submit={submit} onFieldUpdate={onFieldUpdate}>
    {/* Fields will go here */}
  </Form>
)
```

## Props
### `submit` (func)
`submit` is a function that takes values and a callback.
This will gather all form values pass them to the function to submit.
You are also passed a callback that should be called with any errors you include

### `onFieldUpdate` (func):
`onFieldUpdate` is a function that takes a string `name`, and an object, `field`.
`name` is the key of the field that has been updated.
`field` is the object containing the information about the field that has been updated.


## Basic example
This example creates a Form with two text inputs and a submit button.
On submit, it will print the values and wait 3 seconds (to simulate a server call) before calling the callback.

```javascript
function submit(values, callback) {
  console.log('submitted: ', values);
  setTimeout(callback, 3000);
}

const BasicExample = () => (
  <Form submit={submit}>
    <div className="row">
      <TextInput placeholder="Hello, World!" name="hello" />
      <TextInput placeholder="default value" value="This is a default value" name="hello2" />
    </div>
    <div className="row centered">
      <SubmitButton canSubmitText="Submit" cannotSubmitText="Cannot Submit" isSubmittingText="Submitting" />
    </div>
  </Form>
);
```
