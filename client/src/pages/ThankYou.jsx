import { motion } from 'framer-motion';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import SEO from '../components/SEO';
import Button from '../components/Button';

const ThankYou = () => (
  <>
    <SEO
      title="Thank You"
      description="Thank you for contacting Land Global Immigration. Our team will reach out shortly."
      path="/thank-you"
    />
    <section className="flex min-h-[70vh] items-center bg-surface py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl rounded-[2rem] bg-white p-10 text-center shadow-xl ring-1 ring-black/5 md:p-14"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft text-4xl text-primary">
            <FaCheckCircle />
          </div>
          <h1 className="text-3xl font-bold text-ink md:text-4xl">Thank You!</h1>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Your enquiry has been received successfully. One of our immigration consultants will
            contact you shortly to discuss the next steps.
          </p>
          <div className="mt-8">
            <Button to="/">
              <FaHome /> Return Home
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

export default ThankYou;
