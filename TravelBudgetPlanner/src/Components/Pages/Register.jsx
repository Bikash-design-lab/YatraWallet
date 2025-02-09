import React, { useState } from "react";

const Register = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-600">
          {isSignUp ? "Start your journey with us" : "Continue your journey"}
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required={isSignUp}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : isSignUp
              ? "Create Account"
              : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-1 text-blue-500 hover:underline"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";

// const Register = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     // Simulating API call
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center p-4 animate-gradient-x">
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

//       <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden rounded-2xl">
//         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

//         <div className="p-8 space-y-6">
//           <div className="text-center space-y-2">
//             <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full mx-auto mb-4 grid place-items-center">
//               <User className="h-8 w-8 text-white" />
//             </div>
//             <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
//               {isSignUp ? "Create Account" : "Welcome Back"}
//             </h2>
//             <p className="text-gray-500">
//               {isSignUp
//                 ? "Start your journey with us"
//                 : "Continue your journey"}
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {isSignUp && (
//               <div className="space-y-2 group">
//                 <label
//                   htmlFor="name"
//                   className="text-sm font-medium text-gray-700 block"
//                 >
//                   Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500" />
//                   <input
//                     id="name"
//                     type="text"
//                     placeholder="Enter your name"
//                     className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-blue-400"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required={isSignUp}
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="space-y-2 group">
//               <label
//                 htmlFor="email"
//                 className="text-sm font-medium text-gray-700 block"
//               >
//                 Email
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500" />
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-blue-400"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2 group">
//               <label
//                 htmlFor="password"
//                 className="text-sm font-medium text-gray-700 block"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500" />
//                 <input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-blue-400"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   <span>Processing...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>{isSignUp ? "Create Account" : "Sign In"}</span>
//                   <ArrowRight className="h-4 w-4 ml-1" />
//                 </>
//               )}
//             </button>

//             <div className="relative py-4">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   {isSignUp
//                     ? "Already have an account?"
//                     : "Don't have an account?"}
//                 </span>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() => setIsSignUp(!isSignUp)}
//               className="w-full text-blue-600 hover:text-blue-700 font-medium transition-colors py-2 rounded-lg hover:bg-blue-50"
//             >
//               {isSignUp ? "Sign In" : "Create Account"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from "react";
// import { User, Mail, ArrowRight } from "lucide-react";
// const Register = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     // Simulating API call
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center p-4 animate-gradient-x">
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

//       <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden rounded-2xl">
//         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

//         <div className="p-8 space-y-6">
//           <div className="text-center space-y-2">
//             <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full mx-auto mb-4 grid place-items-center">
//               <User className="h-8 w-8 text-white" />
//             </div>
//             <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
//               {isSignUp ? "Create Account" : "Welcome Back"}
//             </h2>
//             <p className="text-gray-500">
//               {isSignUp
//                 ? "Start your journey with us"
//                 : "Continue your journey"}
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {isSignUp && (
//               <div className="space-y-2 group">
//                 <label
//                   htmlFor="name"
//                   className="text-sm font-medium text-gray-700 block"
//                 >
//                   Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500" />
//                   <input
//                     id="name"
//                     type="text"
//                     placeholder="Enter your name"
//                     className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-blue-400"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required={isSignUp}
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="space-y-2 group">
//               <label
//                 htmlFor="email"
//                 className="text-sm font-medium text-gray-700 block"
//               >
//                 Email
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500" />
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-blue-400"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2 group">
//               <label
//                 htmlFor="password"
//                 className="text-sm font-medium text-gray-700 block"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500" />
//                 <input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-blue-400"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   <span>Processing...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>{isSignUp ? "Create Account" : "Sign In"}</span>
//                   <ArrowRight className="h-4 w-4 ml-1" />
//                 </>
//               )}
//             </button>

//             <div className="relative py-4">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   {isSignUp
//                     ? "Already have an account?"
//                     : "Don't have an account?"}
//                 </span>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() => setIsSignUp(!isSignUp)}
//               className="w-full text-blue-600 hover:text-blue-700 font-medium transition-colors py-2 rounded-lg hover:bg-blue-50"
//             >
//               {isSignUp ? "Sign In" : "Create Account"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
