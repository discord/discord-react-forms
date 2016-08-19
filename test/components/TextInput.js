jest.unmock('../../index');

import React from 'react';
import Chance from 'chance';
import {mount} from 'enzyme';
import {getStubbedContext} from '../helpers';
import {TextInput} from '../../index';

describe('TextInput tests', () => {
  const chance = new Chance();
  const stubbedContext = getStubbedContext();

  const mountOptions = {context: stubbedContext};

  describe('Default value tests', () => {
    it('should contain the value from its context when mounted', () => {
      const name = chance.string();
      const value = chance.string();

      stubbedContext.getField.mockReturnValue({value});
      const textInput = mount(<TextInput name={name} />, mountOptions);

      expect(stubbedContext.initField).toBeCalledWith({name, value: '', hasDefaultValue: false});
      expect(textInput.find('.forms-text-input-input').props().value).toBe(value);
      expect(stubbedContext.getField).toBeCalled();
    });

    it('should contain the correct default value when mounted', () => {
      const name = chance.string();
      const value = chance.string();

      stubbedContext.getField.mockReturnValue({value});
      mount(<TextInput name={name} value={value} />, mountOptions);

      expect(stubbedContext.initField).toBeCalledWith({name, value, hasDefaultValue: true});
      expect(stubbedContext.getField).toBeCalled();
    });
  });

  describe('Placeholder tests', () => {
    it('should contain a placeholder if the prop is given', () => {
      const name = chance.string();
      const placeholder = chance.string();

      const textInput = mount(<TextInput name={name} placeholder={placeholder} />, mountOptions);

      const foundInput = textInput.find('.forms-text-input-input');
      expect(foundInput.props().placeholder).toBe(placeholder);
    });

    it('should not contain a placeholder if the prop is not given', () => {
      const textInput = mount(<TextInput name={name} />, mountOptions);

      const foundInput = textInput.find('.forms-text-input-input');
      expect(foundInput.props().placeholder).toBe('');
    });
  });

  describe('On change tests', () => {
    it('should call the correct funtions and update its value on change', () => {
      stubbedContext.getField.mockClear();
      const name = chance.string();
      const value = chance.string();

      const textInput = mount(<TextInput name={name} />, mountOptions);
      textInput.instance().onChange({target: {value: value}});

      expect(stubbedContext.setField).toBeCalledWith({name, value: value});
    });
  });
});
