import TimerMixin from 'react-timer-mixin';
import {CONTEXT_TYPES} from '../../Constants';

const FieldMixin = {
  mixins: [TimerMixin],
  contextTypes: CONTEXT_TYPES,
  _ref: null,

  getField(name=this.props.name) {
    return this.context.getField(name);
  },

  initField(obj) {
    const {name, value, validator} = this.props;
    return this.context.initField({name, value, validator, ...obj});
  },

  setHasBeenTouched({name=this.props.name, touched=true}={}) {
    return this.context.setHasBeenTouched(name, touched);
  },

  setField({name=this.props.name, ...rest}={}) {
    return this.context.setField({name, ...rest});
  },

  removeField(name=this.props.name) {
    return this.context.removeField(name);
  },

  getValue() {
    if (this._ref && this._ref.value) {
      return this._ref.value;
    }
    else {
      return this.getField().value;
    }
  },

  isSubmitting() {
    return this.context.isSubmitting;
  },

  canSubmit() {
    return this.context.canSubmit;
  },

  submit() {
    return this.context.submit();
  },

  setRef(ref) {
    this._ref = ref;
  },

  componentDidMount() {
    const {intervalCheck} = this.props;

    if (this._ref && intervalCheck) {
      this.setInterval(() => {
        const event = new Event('input', {bubbles: true});
        this._ref.dispatchEvent(event);
      }, intervalCheck);
    }
  },

  shouldUpdate(nextContext) {
    const {name} = this.props;
    return this.context.fields[name] != nextContext.fields[name];
  }
};

export default FieldMixin;
