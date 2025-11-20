import { Contact } from "../components/Contact";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export function ContactPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 bg-gradient-to-b from-[#474846] to-[#474846]/95">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white mb-6">Let's Work Together</h1>
            <p className="text-white/90 text-lg">
              Whether you have a specific project in mind or just want to
              explore possibilities, we'd love to hear from you. Let's start a
              conversation about how we can bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#474846] mb-4">Frequently Asked Questions</h2>
            <p className="text-[#474846]/70">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "What is your typical turnaround time?",
                answer:
                  "Turnaround times vary based on project complexity, but most architectural renders take 5-7 business days, product visualizations 3-5 days, and animations 2-3 weeks. We also offer rush services for urgent projects.",
              },
              {
                question: "How many revisions are included?",
                answer:
                  "We include up to 3 rounds of revisions with all projects to ensure you're completely satisfied with the final result. Additional revisions can be accommodated if needed.",
              },
              {
                question: "What file formats do you deliver?",
                answer:
                  "We deliver high-resolution images in JPG, PNG, and TIFF formats. For animations, we provide MP4 and MOV files. We can also accommodate specific format requests based on your needs.",
              },
              {
                question: "Do you work with international clients?",
                answer:
                  "Absolutely! We work with clients worldwide and have experience collaborating across different time zones. Communication is primarily through email and video calls.",
              },
              {
                question: "What information do you need to start a project?",
                answer:
                  "For architectural projects, we need CAD files, drawings, or sketches, along with material specifications and reference images. For product visualization, we need product specifications, CAD files or detailed photos, and any brand guidelines.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg"
              >
                <h3 className="text-[#474846] mb-3">{faq.question}</h3>
                <p className="text-[#474846]/70">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
