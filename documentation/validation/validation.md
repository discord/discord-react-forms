# Validation

## Client side validation
Most components can have a validator function attached to them.

A Validator function takes two parameters, a `name` and a `field`.
The `name` will tell you which field is being validated, and the field will give you access to the field's data.

The validator should either return an error or nothing.
If a validator returns a truthy value, the field will be invalid and the error will be displayed along side the field.

### Example
This example checks if the value is equal to `'bad'` and returns `'error!'` as the error if it is.
Otherwise, it returns undefined, and the field is valid.

```javascript
function validator(name, {value}) {
  if (value == 'bad') {
    return 'error!';
  }
}
```

## Server side validation
The submit funtion the form takes is required to call the callback in order for the form to know it is done submitting.
Along with this, you have the opportunity to alert the users of any errors by passing an object into the callback.
This should contain keys that map to the field's name that contains the error, with a value of the error.

### Example
In this example, we check to see if the field with the name `text`'s value is not `good`.
If it is not, we callback with an error.
Otherwise, we callback without an object, therefore, no errors.

```javascript
function submit(values, callback) {
  setTimeout(() => {
    if (values.text != 'good') {
      callback({text: 'Oh no! Something bad happened on the server'});
    }
    else {
      callback();
    }
  }, 1000);
```

## Full example
This example puts client and server side validation together.
It will prevent users from submiting the value `bad` on the client, and any value that does not equal `good` will be
rejected on the fake server.


```javascript
function validator(name, {value}) {
  if (!value.length) {
    return 'Yo, fill this out';
  }
  else if (value == 'bad') {
    return 'That value is no good';
  }
}

function submit(values, callback) {
  setTimeout(() => {
    if (values.text != 'good') {
      callback({text: 'Oh no! Something bad happened on the server'});
    }
    else {
      callback();
    }
  }, 1000);

const ValidationExample = () => (
  <Form submit={submit}>
    <TextInput name="text" validator={validator} required label="Must be valid" />
    <SubmitButton
      canSubmitText="Submit"
      cannotSubmitText="Cannot Submit"
      isSubmittingText="Submitting" />
  </Form>
);
}
```
