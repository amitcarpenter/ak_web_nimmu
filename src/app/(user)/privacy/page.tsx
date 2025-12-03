export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-dark dark:text-white mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">1. Information We Collect</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            We collect information that you provide directly to us, including name, email, phone number, and delivery address.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">2. How We Use Your Information</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            We use the information we collect to process orders, communicate with you, and improve our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">3. Information Sharing</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            We do not sell your personal information. We may share information with delivery partners and payment processors as necessary.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">4. Data Security</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            We implement appropriate security measures to protect your personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">5. Your Rights</h2>
          <p className="text-dark-5 dark:text-dark-6 mb-4">
            You have the right to access, update, or delete your personal information at any time.
          </p>
        </section>
      </div>
    </div>
  );
}

