import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | Accrue",
  description: "Supercharge and centralize your project planning with Accrue.",
};

export default async function Index() {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <h3 className="font-bold text-4xl lg:text-5xl text-purple-200 pb-2">
        privacy policy
      </h3>
      <div className="flex flex-col items-start self-center max-w-3xl space-y-4">
        <p className="text-lg text-white leading-relaxed">
          We're very committed to user privacy. This policy outlines what
          information we collect, how we use it, and with whom we share it.
        </p>
        <div className="flex flex-col items-start bg-zinc-900 rounded-md p-6">
          <h3 className="font-bold text-xl lg:text-2xl text-purple-200 pb-2">
            summary
          </h3>
          <ul className="list-disc list-inside text-white text-lg">
            <li>no PII collected</li>
            <li>anonymous analytics</li>
            <li>only functional cookies</li>
            <li>no tracking</li>
            <li>no sharing data with third parties</li>
          </ul>
        </div>
        <h4 className="font-bold text-xl lg:text-2xl text-purple-200 pb-2">
          Information We Collect
        </h4>
        <p className="text-lg text-white leading-relaxed">
          We do not collect any personally identifiable information (PII) from
          our users. We require users to create an account with an email in
          order to use our services. We only collect information that is
          necessary for the operation of our platform, such as email addresses
          and user-generated content (project data, chat messages, etc.).
        </p>
        <h4 className="font-bold text-xl lg:text-2xl text-purple-200 pb-2">
          How We Use Information
        </h4>
        <p className="text-lg text-white leading-relaxed">
          We use the information we collect to operate, improve, and expand our
          services. This includes using anonymous analytics tools to understand
          how users interact with our platform and make data-driven decisions
          about how to improve their experience.
        </p>
        <h4 className="font-bold text-xl lg:text-2xl text-purple-200 pb-2">
          With Whom We Share Information
        </h4>
        <p className="text-lg text-white leading-relaxed">
          We do not share any user information with third parties. We believe in
          protecting the privacy of our users and do not sell or share their
          data with anyone. This includes user information any user-generated
          content on our platform.
        </p>
        <h4 className="font-bold text-xl lg:text-2xl text-purple-200 pb-2">
          Cookies and Other Tracking Technologies
        </h4>
        <p className="text-lg text-white leading-relaxed">
          We use functional cookies to enable a better user experience. We do
          not use any other tracking technologies to collect information about
          you.
        </p>
        <h4 className="font-bold text-xl lg:text-2xl text-purple-200 pb-2">
          Third Party Services
        </h4>
        <p className="text-lg text-white leading-relaxed">
          We may use third party services to provide certain features or
          functionality on our platform. These services may collect information
          about you, but we do not share this information with them. We will
          only use these services if they are necessary for the operation of our
          platform and have agreed to adhere to our privacy policies.
        </p>
        <h4 className="font-bold text-xl lg:text-2xl text-purple-200 pb-2">
          Changes to This Policy
        </h4>
        <p className="text-lg text-white leading-relaxed">
          We reserve the right to modify this policy at any time. We will notify
          users of any changes to this policy by updating the "last updated"
          date at the top of this page and by sending an email to the email
          address associated with their account. We encourage users to review
          this policy frequently to stay informed about how we are protecting
          their information.
        </p>
        <h4 className="font-bold text-xl lg:text-2xl text-purple-200 pb-2">
          Contact Us
        </h4>
        <p className="text-lg text-white leading-relaxed">
          If you have any questions or concerns about our privacy policies,
          please contact us at
          <a
            href="mailto:
          support@accrue.com"
            className="text-purple-300"
          >
            {" "}
            support@accrueapp.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
