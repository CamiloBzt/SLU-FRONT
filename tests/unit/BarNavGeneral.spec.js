import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import BarNavGeneral from '../../src/components/BarNavGeneral.vue';

describe('BarNavGeneral.vue', () => {
  it('renderiza los links y marca el activo', () => {
    const items = [
      { id: 1, path: '/home', text: 'Home', active: false },
      { id: 2, path: '/about', text: 'About', active: true }
    ];
    const wrapper = shallowMount(BarNavGeneral, {
      propsData: { NavContent: items },
      stubs: { 'router-link': RouterLinkStub }
    });
    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links.length).toBe(2);
    expect(links.at(1).classes()).toContain('lnkActive');
    expect(links.at(0).text()).toBe('Home');
    expect(links.at(1).text()).toBe('About');
  });
});
