export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-dark dark:text-white mb-8">Terms & Conditions</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">1. Acceptance of Terms</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            By accessing and using FoodHub, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">2. Use License</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            Permission is granted to temporarily use FoodHub for personal, non-commercial transitory viewing only.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">3. Orders and Payments</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            All orders are subject to product availability. We reserve the right to refuse or cancel any order.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">4. Delivery</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            Delivery times are estimates and not guaranteed. We are not liable for delays due to circumstances beyond our control.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">5. Returns and Refunds</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            Please refer to our Refund Policy for details on returns and refunds.
          </p>
        </section>
      </div>
    </div>
  );
}

