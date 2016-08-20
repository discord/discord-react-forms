jest.unmock('../../../index');

import Chance from 'chance';
import {getStubbedContext} from '../../helpers';
import {FieldMixin} from '../../../index';

describe('FieldMixin tests', () => {
  const stubbedContext = getStubbedContext();
  const chance = new Chance();
  const mixin = FieldMixin;
  mixin.context = stubbedContext;

  describe('Get field tests', () => {
    it('should call get field from its context', () => {
      const name = chance.string();

      mixin.props = {name};
      mixin.getField();

      expect(stubbedContext.getField).toBeCalledWith(name);
    });

    it('should call get field with a custom name', () => {
      const name = chance.string();

      mixin.getField(name);

      expect(stubbedContext.getField).toBeCalledWith(name);
    });
  });

  describe('Init field tests', () => {
    it('should ask its context to initialize a field generically', () => {
      const name = chance.string();
      const value = chance.string();
      const validator = jest.fn();

      mixin.props = {name, value, validator};
      mixin.initField();

      expect(stubbedContext.initField).toBeCalledWith({name, value, validator});
    });

    it('should ask its context to initialize a field with its passed in options', () => {
      const propName = chance.string();
      const propValue = chance.string();
      const name = chance.string();
      const value = chance.string();

      mixin.props = {name: propName, value: propValue};
      mixin.initField({name, value});

      expect(stubbedContext.initField).toBeCalledWith({name, value});
    });
  });

  describe('Set has been touched tests', () => {
    it('should ask its context to set a field to touched when not given a param', () => {
      const name = chance.string();

      mixin.props = {name};
      mixin.setHasBeenTouched();

      expect(stubbedContext.setHasBeenTouched).toBeCalledWith(name, true);
    });

    it('should accept parameters to override the defaults', () => {
      const propName = chance.string();
      const name = chance.string();
      const touched = chance.bool();

      mixin.props = {name: propName};
      mixin.setHasBeenTouched({name, touched});

      expect(stubbedContext.setHasBeenTouched).toBeCalledWith(name, touched);
    });
  });

  describe('Set field tests', () => {
    it('should ask its context to set the field with its name prop', () => {
      const name = chance.string();
      const value = chance.string();

      mixin.props = {name};
      mixin.setField({value});

      expect(stubbedContext.setField).toBeCalledWith({name, value});
    });

    it('should accept parameters to override the defaults', () => {
      const name = chance.string();
      const value = chance.string();

      mixin.props = {name};
      mixin.setField({name, value});

      expect(stubbedContext.setField).toBeCalledWith({name, value});
    });
  });

  describe('Remove field tests', () => {
    it('should ask its context to remove the field with its name prop', () => {
      const name = chance.string();

      mixin.props = {name};
      mixin.removeField();

      expect(stubbedContext.removeField).toBeCalledWith(name);
    });

    it('should accept parameters to override the defaults', () => {
      const name = chance.string();
      const name2 = chance.string();

      mixin.props = {name};
      mixin.removeField(name2);

      expect(stubbedContext.removeField).toBeCalledWith(name2);
    });
  });

  describe('Submitting tests', () => {
    it('should ask its context if it can submit', () => {
      const canSubmit = chance.bool();
      stubbedContext.canSubmit = canSubmit;
      expect(mixin.canSubmit()).toBe(canSubmit);
    });

    it('should ask its context if it is submitting', () => {
      const isSubmitting = chance.bool();
      stubbedContext.isSubmitting = isSubmitting;
      expect(mixin.isSubmitting()).toBe(isSubmitting);
    });

    it('should ask its context to submit', () => {
      mixin.submit();
      expect(stubbedContext.submit).toBeCalled();
    });
  });
});
