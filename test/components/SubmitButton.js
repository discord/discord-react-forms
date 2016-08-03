jest.unmock('../../lib/components/SubmitButton');
jest.unmock('../../lib/components/common/FieldMixin');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Chance from 'chance';
import {mount} from 'enzyme';
import {getStubbedContext} from '../helpers';
import SubmitButton from '../../lib/components/SubmitButton';

describe('SubmitButton tests', () => {
  const chance = new Chance();
  const stubbedContext = getStubbedContext();
  const mountOptions = {context: stubbedContext};

  describe('Text tests', () => {
    it('should contain the can submit text if it can be submitted', () => {
      const canSubmitText = chance.string();
      const cannotSubmitText = chance.string();
      const isSubmittingText = chance.string();

      stubbedContext.canSubmit = true;
      stubbedContext.isSubmitting = false;
      const button = mount(
        <SubmitButton
          canSubmitText={canSubmitText} cannotSubmitText={cannotSubmitText} isSubmittingText={isSubmittingText} />,
        mountOptions
      );

      const foundButton = button.find('.form-submit-button');
      expect(foundButton.props().children).toBe(canSubmitText);
    });

    it('should contain the can cannot submit text if it can not be submitted', () => {
      const canSubmitText = chance.string();
      const cannotSubmitText = chance.string();
      const isSubmittingText = chance.string();

      stubbedContext.canSubmit = false;
      stubbedContext.isSubmitting = false;
      const button = mount(
        <SubmitButton
          canSubmitText={canSubmitText} cannotSubmitText={cannotSubmitText} isSubmittingText={isSubmittingText} />,
        mountOptions
      );

      const foundButton = button.find('.form-submit-button');
      expect(foundButton.props().children).toBe(cannotSubmitText);
    });

    it('should contain the can submitting text if it is being submitted', () => {
      const canSubmitText = chance.string();
      const cannotSubmitText = chance.string();
      const isSubmittingText = chance.string();

      stubbedContext.canSubmit = false;
      stubbedContext.isSubmitting = true;
      const button = mount(
        <SubmitButton
          canSubmitText={canSubmitText} cannotSubmitText={cannotSubmitText} isSubmittingText={isSubmittingText} />,
        mountOptions
      );

      const foundButton = button.find('.form-submit-button');
      expect(foundButton.props().children).toBe(isSubmittingText);
    });
  });
});
