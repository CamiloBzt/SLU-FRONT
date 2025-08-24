import { shallowMount } from '@vue/test-utils';
import ConfirmationModal from '../../src/components/ConfirmationModal.vue';

const stubs = {
  'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
  'v-row': { template: '<div><slot /></div>' }
};

describe('ConfirmationModal.vue', () => {
  it('muestra el titulo cuando esta visible', () => {
    const wrapper = shallowMount(ConfirmationModal, {
      propsData: { showConfirmationModal: true, title: 'Pregunta' },
      stubs
    });
    expect(wrapper.find('.Header').text()).toBe('Pregunta');
  });

  it('emite closeConfirmationModal al hacer clic en Cancel', async () => {
    const wrapper = shallowMount(ConfirmationModal, {
      propsData: { showConfirmationModal: true },
      stubs
    });
    const cancelBtn = wrapper.findAll('button.buttons').at(0);
    await cancelBtn.trigger('click');
    expect(wrapper.emitted().closeConfirmationModal).toBeTruthy();
  });

  it('emite confirmAction y closeConfirmationModal al hacer clic en Ok', async () => {
    const wrapper = shallowMount(ConfirmationModal, {
      propsData: { showConfirmationModal: true },
      stubs
    });
    const okBtn = wrapper.findAll('button.buttons').at(1);
    await okBtn.trigger('click');
    expect(wrapper.emitted().confirmAction).toBeTruthy();
    expect(wrapper.emitted().closeConfirmationModal).toBeTruthy();
  });
});
