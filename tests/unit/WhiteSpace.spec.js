import { shallowMount } from '@vue/test-utils';
import WhiteSpace from '../../src/components/WhiteSpace.vue';

describe('WhiteSpace.vue', () => {
  it('renderiza un div con la clase whiteSpace', () => {
    const wrapper = shallowMount(WhiteSpace);
    expect(wrapper.classes()).toContain('whiteSpace');
  });
});
