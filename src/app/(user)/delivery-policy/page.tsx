export default function DeliveryPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-dark dark:text-white mb-8">Delivery Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Delivery Areas</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            We currently deliver to select areas. Please check if your location is serviceable before placing an order.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Delivery Charges</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            Free delivery on orders above ₹500. For orders below ₹500, a delivery charge of ₹50 applies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Delivery Time</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            Standard delivery takes 30-40 minutes. You can also schedule delivery for a specific time slot.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Order Tracking</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            You can track your order in real-time from the Orders page or through the tracking link sent to your email.
          </p>
        </section>
      </div>
    </div>
  );
}

