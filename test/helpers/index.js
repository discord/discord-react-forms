const stubbedContext = {
  setField: jest.fn(),
  initField: jest.fn(),
  getField: jest.fn(),
  removeField: jest.fn(),
  setHasBeenTouched: jest.fn(),
  canSubmit: false,
  isSubmitting: false,
  submit: jest.fn()
};

export default {
  getStubbedContext: () => stubbedContext
};
