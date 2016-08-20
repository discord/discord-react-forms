# Custom Field Components
If you would like to create your own custom component, it would be ideal to extend `FieldMixin`.
This mixin contains many helper functions for interacting with a form.

## FieldMixin

FieldMixin is the base of each Field component. It talks to the Form through its context, and attaches all methods from
its context to `this`.

### Helper functions

`getField(name=this.props.name)`: asks the form for a field's data

`initField(data)`: tells the form to initialize a field with this data.
By default, it will include `name`, `value`, `validator` from its props.

`setHasBeenTouched({name=this.props.name, touched=true}={})`: tells the form that the field has been touched/edited.
This is useful for fields that are required and you want to prompt the user to edit a field,
but you do not want to show an error when the user loads the form.

`setField({name=this.props.name, ...rest}={})`: tells the form to set the field data.
By default, it will include the name. Anything else must be passed in the object.

`removeField({name=this.props.name})`: tells the form to remove a field. By default, it will use the name prop.

`isSubmitting()`: Asks the form if it is currently being submitted.

`canSubmit()`: Asks the form whether or not it can be submitted.

`submit()`: Tells the form to submit.
This will call the `submit` prop passed to the [`Form`](../components/form.md) component
