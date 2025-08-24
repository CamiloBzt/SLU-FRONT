import { shallowMount } from '@vue/test-utils';
import TitlePage from '../../src/components/TitlePage.vue';

jest.mock('../../src/components/Menu/Notifications', () => ({
  name: 'Notifications',
  render: h => h('div')
}));

jest.mock('../../src/components/Filters/Searcher', () => ({
  name: 'Searcher',
  render: h => h('div')
}));

describe('TitlePage.vue', () => {
  it('muestra el titulo proporcionado', () => {
    const wrapper = shallowMount(TitlePage, {
      propsData: { title: 'Mi Titulo' }
    });
    expect(wrapper.find('h4').text()).toBe('Mi Titulo');
  });
});
