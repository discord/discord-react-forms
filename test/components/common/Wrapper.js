jest.unmock('../../../lib/components/common/Wrapper');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Chance from 'chance';
import {mount} from 'enzyme';
import Wrapper from '../../../lib/components/common/Wrapper';

describe('Wrapper tests', () => {
  const chance = new Chance();

  describe('Label tests', () => {
    it('should include a label when given the prop', () => {
      const label = chance.string();

      const wrapper = mount(<Wrapper label={label} />);

      const foundLabel = wrapper.find('.form-label');
      expect(foundLabel.length).toBe(1);
      expect(foundLabel.props().children).toBe(label);
    });

    it('should not contain a label when not given the prop', () => {
      const wrapper = mount(<Wrapper />);

      const foundLabel = wrapper.find('.form-label');
      expect(foundLabel.length).toBe(0);
    });
  });

  describe('Required tests', () => {
    it('should include the required star when required', () => {
      const wrapper = mount(<Wrapper required />);

      const foundRequired = wrapper.find('.form-required-star');
      expect(foundRequired.length).toBe(1);
      expect(foundRequired.props().children).toBe('* ');
    });

    it('should not include the required star if not required', () => {
      const wrapper = mount(<Wrapper />);

      const foundRequired = wrapper.find('.form-required-star');
      expect(foundRequired.length).toBe(0);
    });
  });

  describe('Error tests', () => {
    it('should include an error when given the prop', () => {
      const error = chance.string();

      const wrapper = mount(<Wrapper error={error} />);

      const foundError = wrapper.find('.form-error');
      expect(foundError.length).toBe(1);
      expect(foundError.props().children).toBe(error);
    });

    it('should not include an error when not given the prop', () => {
      const wrapper = mount(<Wrapper />);

      const foundError = wrapper.find('.form-error');
      expect(foundError.length).toBe(0);
    });
  });
});
