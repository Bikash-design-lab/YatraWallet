import React, { useState } from "react";
import FAQImage from "../../assets/FAQ.jpg?inline";
import {
  ChevronDown,
  HelpCircle,
  IndianRupee,
  BarChart,
  Users,
  Bell,
  Wallet,
  FileText,
  Globe,
} from "lucide-react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      icon: <Wallet className="w-6 h-6" />,
      question: "How do I track my travel expenses?",
      answer:
        "Our expense tracking interface allows you to easily log travel expenses with key details like date, description, amount, and category. Simply input your expenses through our user-friendly dashboard with clearly labeled fields. You can use our suggested categories or create custom ones for better organization.",
    },
    {
      icon: <IndianRupee className="w-6 h-6" />,
      question: "Can I create custom expense categories?",
      answer:
        "Yes! While we provide pre-defined categories like flights, food, and activities, you can create and modify categories to match your specific needs. All categories are color-coded for easy identification and organization of your expenses.",
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      question: "How can I visualize my spending patterns?",
      answer:
        "We provide interactive visual graphs and pie charts that display your budget allocation and spending patterns. You can easily see breakdowns of your expenses by category, track your spending trends, and analyze your financial decisions through our intuitive visualization tools.",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      question: "Will I receive notifications about my budget?",
      answer:
        "Yes! Our app sends customizable alerts to notify you when you're approaching or exceeding budget limits in specific categories. You can choose to receive in-app notifications, push notifications, or email reminders to help you stay on track.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      question: "Can I generate expense reports?",
      answer:
        "Absolutely! You can generate detailed expense reports in PDF or CSV formats. These reports include total expenses, category breakdowns, and budget adherence analytics. This feature helps you track spending patterns and plan better for future trips.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      question: "Does the app support different currencies?",
      answer:
        "Yes! Our built-in currency converter helps you enter expenses in different currencies and view them in your home currency. The converter uses real-time exchange rates and can automatically detect your location for convenience.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      question: "Can I share expenses with travel companions?",
      answer:
        "Yes! Our collaborative budgeting feature allows you to invite travel companions to contribute to a shared budget and track expenses collectively. All group members can enter expenses, and the shared budget updates in real-time to keep everyone informed.",
    },
  ];

  return (
    <div className="relative  min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      {/* <div className="absolute inset-0 w-full h-full">
        <img
          src={FAQImage}
          alt="Background"
          className="w-full h-full object-cover fixed"
        />
        <div className="absolute inset-0 bg-black/40" />{" "}
      </div> */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${FAQImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative min-h-screen py-2  px-4 sm:px-6 lg:px-8">
        {/* FAQ Container */}
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-2">
            <HelpCircle className="w-16 h-16 text-blue-700 mx-auto" />
            <p className="text-xl text-black font-bold">
              Frequently Asked Questions            </p>
          </div>

          {/* FAQ Cards */}
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-1 bg-gradient-to-r from-[#ffedd5] via-[#ffffff] to-[#dbeafe] shadow-lg backdrop-blur-sm rounded-lg transition-all duration-300 hover:shadow-xl"
              >
                <button
                  className="cursor-pointer w-full text-left px-6 py-2 flex items-center justify-between gap-4"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="text-blue-600 shrink-0">{faq.icon}</div>
                    <h3 className="text-lg font-medium text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                >
                  <p className="px-6 pb-6 text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
