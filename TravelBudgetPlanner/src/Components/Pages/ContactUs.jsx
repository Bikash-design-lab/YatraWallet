import React, { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import contact from "../../assets/contact.jpg?inline";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 ">
      {/* Background Image */}

      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${contact})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contact Form Container */}
      <div className="relative max-w-full sm:max-w-3xl md:max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-5 bg-blue-600 px-4 sm:px-6 md:px-8 rounded-2xl text-white text-center grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="text-2xl sm:text-3xl font-bold">📞 Contact Us</div>
          <div className="text-blue-200 text-sm sm:text-base">We'd love to hear from you!</div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 bg-gradient-to-r from-[#ffedd5] via-[#ffffff] to-[#dbeafe] shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Form Section */}
            <div className="">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    placeholder="Enter email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    rows="3 sm:rows-4"
                    className="w-full px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-1 sm:py-2 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-blue-50 mb-2 text-center rounded-lg space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2 sm:mb-4">
                  Contact Information
                </h3>
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-center sm:justify-start ml-0 sm:ml-2 space-x-3 text-blue-800">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">YatraWallet@YW.com</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start ml-0 sm:ml-2 space-x-3 text-blue-800">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">+91 92345 67890</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start ml-0 sm:ml-2 space-x-3 text-blue-800">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">123 Business Street, Kolkata, India</span>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="rounded-lg overflow-hidden h-48 sm:h-56 md:h-64 bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30773484.55170563!2d61.02451656116589!3d19.69009515037612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1734818086329!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  title="Location Map"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
// import React, { useState } from "react";
// import { MapPin, Mail, Phone } from "lucide-react";
// import contact from "../../assets/contact.jpg?inline";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Your message has been sent!");
//   };

//   return (
//     <div className="relative min-h-fit w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 ">
//       {/* Background Image */}
//       <div className="absolute inset-0 w-screen h-screen">
//         <img
//           src={contact}
//           alt="Contact Us"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40"></div>{" "}
//         {/* Dark Overlay */}
//       </div>

//       {/* Contact Form Container */}
//       <div className=" relative max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className=" border-5  bg-blue-600 px-6 rounded-2xl sm:px-8 text-white text-center grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div className="text-3xl font-bold">📞 Contact Us</div>
//           <div className="text-blue-200">We'd love to hear from you!</div>
//         </div>

//         {/* Content */}
//         <div className="px-6 py-3 bg-gradient-to-r from-[#ffedd5] via-[#ffffff] to-[#dbeafe] shadow-lg">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Form Section */}
//             <div className="">
//               <form onSubmit={handleSubmit} className="">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Enter Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     placeholder="Enter email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Message
//                   </label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Type your message..."
//                     rows="4"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>

//             {/* Contact Information */}
//             <div className="space-y-6">
//               <div className="bg-blue-50 mb-2 text-center rounded-lg space-y-4">
//                 <h3 className="text-xl font-semibold text-blue-900  mb-4">
//                   Contact Information
//                 </h3>
//                 <div className="space-y-2">
//                   <div className="flex items-center ml-2 space-x-3 text-blue-800">
//                     <Mail className="w-5 h-5" />
//                     <span>YatraWallet@YW.com</span>
//                   </div>
//                   <div className="flex items-center ml-2 space-x-3 text-blue-800">
//                     <Phone className="w-5 h-5" />
//                     <span>+91 92345 67890</span>
//                   </div>
//                   <div className="flex items-center ml-2 space-x-3 text-blue-800">
//                     <MapPin className="w-5 h-5" />
//                     <span>123 Business Street, Kolkata, India</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Map Section */}
//               <div className="rounded-lg overflow-hidden h-64 bg-gray-100">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30773484.55170563!2d61.02451656116589!3d19.69009515037612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1734818086329!5m2!1sen!2sin"
//                   className="w-full h-full border-0"
//                   allowFullScreen=""
//                   loading="lazy"
//                   title="Location Map"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;
