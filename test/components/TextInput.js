jest.unmock('../../lib/components/TextInput');
jest.unmock('../../lib/components/common/FieldMixin');
jest.unmock('../../lib/components/common/FieldWrapper');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Chance from 'chance';
import {mount} from 'enzyme';
import {getStubbedContext} from '../helpers';
import TextInput from '../../lib/components/TextInput';

describe('TextInput tests', () => {
  const chance = new Chance();
  console.log(getStubbedContext);
  const stubbedContext = getStubbedContext();

  const mountOptions = {context: stubbedContext};

  describe('Default value tests', () => {
    it('should contain the value from its context when mounted', () => {
      const name = chance.string();
      const value = chance.string();

      stubbedContext.getField.mockReturnValue({value});
      const textInput = mount(<TextInput name={name} />, mountOptions);

      expect(stubbedContext.initField).toBeCalledWith({name, value: '', hasDefaultValue: false});
      expect(textInput.find('.form-text-input').props().value).toBe(value);
      expect(stubbedContext.getField).toBeCalled();
    });

    it('should contain the correct default value when mounted', () => {
      const name = chance.string();
      const value = chance.string();

      stubbedContext.getField.mockReturnValue({value});
      const textInput = mount(<TextInput name={name} value={value} />, mountOptions);

      expect(stubbedContext.initField).toBeCalledWith({name, value, hasDefaultValue: true});
      expect(stubbedContext.getField).toBeCalled();
    });
  });

  describe('Placeholder tests', () => {
    it('should contain a placeholder if the prop is given', () => {
      const name = chance.string();
      const placeholder = chance.string();

      const textInput = mount(<TextInput name={name} placeholder={placeholder} />, mountOptions);

      const foundInput = textInput.find('.form-text-input');
      expect(foundInput.props().placeholder).toBe(placeholder);
    });

    it('should not contain a placeholder if the prop is not given', () => {
      const textInput = mount(<TextInput name={name} />, mountOptions);

      const foundInput = textInput.find('.form-text-input');
      expect(foundInput.props().placeholder).toBe('');
    });
  });

  describe('On change tests', () => {
    it('should call the correct funtions and update its value on change', () => {
      const name = chance.string();
      const value = chance.string();
      const value2 = chance.string();

      stubbedContext.getField.mockReturnValue({value});
      const textInput = mount(<TextInput name={name} />, mountOptions);
      stubbedContext.getField.mockReturnValue({value: value2});
      textInput.instance().onChange({target: {value: value2}});
      textInput.update();

      const foundInput = textInput.find('.form-text-input');
      expect(stubbedContext.setField).toBeCalledWith({name, value: value2});
      expect(foundInput.props().value).toBe(value2);
    });
  });
});
