export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-dark dark:text-white mb-8">Refund Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Refund Eligibility</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            Refunds are available for orders cancelled within 30 minutes of placement or for items that are damaged, incorrect, or missing.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Refund Process</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            To request a refund, please contact our support team or raise a request from the Orders page. Refunds will be processed within 5-7 business days.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Refund Method</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            Refunds will be credited to the original payment method used for the order. For Cash on Delivery orders, refunds will be processed to your wallet.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Non-Refundable Items</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            Perishable items that have been delivered cannot be refunded unless they are damaged or incorrect.
          </p>
        </section>
      </div>
    </div>
  );
}

