jest.unmock('../../../index');

import React from 'react';
import Chance from 'chance';
import {mount} from 'enzyme';
import {FieldWrapper} from '../../../index';

describe('FieldWrapper tests', () => {
  const chance = new Chance();

  describe('Label tests', () => {
    it('should include a label when given the prop', () => {
      const label = chance.string();

      const wrapper = mount(<FieldWrapper label={label} />);

      const foundLabel = wrapper.find('.forms-label');
      expect(foundLabel.length).toBe(1);
      expect(foundLabel.props().children).toBe(label);
    });

    it('should not contain a label when not given the prop', () => {
      const wrapper = mount(<FieldWrapper />);

      const foundLabel = wrapper.find('.forms-label');
      expect(foundLabel.length).toBe(0);
    });
  });

  describe('Required tests', () => {
    it('should include the required star when required', () => {
      const wrapper = mount(<FieldWrapper required />);

      const foundRequired = wrapper.find('.forms-required-star');
      expect(foundRequired.length).toBe(1);
      expect(foundRequired.props().children).toBe('* ');
    });

    it('should not include the required star if not required', () => {
      const wrapper = mount(<FieldWrapper />);

      const foundRequired = wrapper.find('.forms-required-star');
      expect(foundRequired.length).toBe(0);
    });
  });

  describe('Error tests', () => {
    it('should include an error when given the an error and displayError props', () => {
      const error = chance.string();

      const wrapper = mount(<FieldWrapper error={error} displayError={true} />);

      const foundError = wrapper.find('.forms-error');
      expect(foundError.length).toBe(1);
      expect(foundError.props().children).toBe(error);
    });

    it('should not include an error when given an error, but no displayError prop', () => {
      const error = chance.string();

      const wrapper = mount(<FieldWrapper error={error} />);

      const foundError = wrapper.find('.forms-error');
      expect(foundError.length).toBe(0);
    });

    it('should not include an error when not given the prop', () => {
      const wrapper = mount(<FieldWrapper />);

      const foundError = wrapper.find('.forms-error');
      expect(foundError.length).toBe(0);
    });
  });
});
