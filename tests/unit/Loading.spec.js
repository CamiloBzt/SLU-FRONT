import { shallowMount } from '@vue/test-utils';
import Loading from '../../src/components/loading.vue';

describe('loading.vue', () => {
  it('no renderiza nada cuando show es false', () => {
    const wrapper = shallowMount(Loading, {
      propsData: { show: false }
    });
    expect(wrapper.html()).toBeFalsy();
  });

  it('muestra el loader cuando show es true', () => {
    const wrapper = shallowMount(Loading, {
      propsData: { show: true, position: '' }
    });
    expect(wrapper.classes()).toContain('Loading');
  });

  it('agrega la clase Loading-Absolute cuando position es truthy', () => {
    const wrapper = shallowMount(Loading, {
      propsData: { show: true, position: 'absolute' }
    });
    expect(wrapper.classes()).toContain('Loading-Absolute');
  });
});
