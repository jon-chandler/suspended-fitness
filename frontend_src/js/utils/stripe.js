import { loadStripe } from '@stripe/stripe-js'

const sKey = 'sk_test_51S8QxnEad35pCFHl5R84H90f7wjn9fvdtzXxFO70JgDGUkDZxtDQLki782UyBEkopRv2IXty5Ql3XJPXUpWVztdk008GEDDzRQ'
const pKey = 'pk_test_51S8QxnEad35pCFHl7T75TJYFhaaS1LJCcvFkhpd6thynfJcdbiotB0qf7P2P2tfJo0YqXQYYYtTDF5GPnylglvcC00CDb6lDHp'
const sessKey = 'rk_test_51S8QxnEad35pCFHlWDHzulHvOvw6BFXeYJZUxGlqdNrZ4pnmKd9hk2Og0ndgmbPufHz0miYtBBrWo2vnTRIWA3Ja00lpTg6Amp'

const stripe = await loadStripe(pKey);

async function initializeStripe() {
  const fetchClientSecret = async () => {
    const response = await fetch('http://localhost/session.php', {
      method: "POST",
    })
    const { clientSecret } = await response.json()
    return clientSecret
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret
  })

  checkout.mount('#payment-form')
}


initializeStripe()