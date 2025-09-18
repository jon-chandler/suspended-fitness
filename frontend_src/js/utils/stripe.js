import { loadStripe } from '@stripe/stripe-js'
import { shuffleCards } from './utils'

const pKey = 'pk_test_51S8QxnEad35pCFHl7T75TJYFhaaS1LJCcvFkhpd6thynfJcdbiotB0qf7P2P2tfJo0YqXQYYYtTDF5GPnylglvcC00CDb6lDHp'

// add back in.......
//const stripe = await loadStripe(pKey);
////////////////////

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

// add back in.......
//initializeStripe()
/////////////////////