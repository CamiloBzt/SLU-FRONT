import WalletListView from "./list/WalletListView.vue"
import PaymentRequestView from "./payment-request/PaymentRequestView.vue"
export const walletWoutes = [
  {
    path: '/wallet',
		name: 'Wallet',
    meta: { requiresAuth: true },
		component: WalletListView
  },
  {
    path: '/wallet/:subscriptionId/payment-request',
		name: 'Portafolio and accounting',
    meta: { requiresAuth: true },
		component: PaymentRequestView
  }
]