import React from "react";
import BikashProf from "../../assets/BikashProf.jpg";
import HarmanJot from "../../assets/HarmanJot.jpg";
import Devadurgam from "../../assets/Devadurgam.jpg";

const Team = () => {
  const teamMembers = [
    {
      name: "Bikash Prasad Barnwal",
      role: "Frontend Visionary + Backend Builder",
      image: BikashProf,
    },
    {
      name: "Harman Jot",
      role: "UI/UX Engineer Extraordinaire",
      image: HarmanJot,
    },
    {
      name: "Devadurgam Narasimha",
      role: "Full-Stack Maestro",
      image: Devadurgam,
    },
  ];
  return (
    <div className=" min-h-screen bg-gradient-to-r from-orange-100 via-white to-blue-100 py-16">
      {/* Header Section */}
      <div className="relative flex justify-center items-center mb-12">
        <div className="flex items-center cursor-pointer">
          <div className="absolute w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent left-1/2 -translate-x-32 top-1/2"></div>
          <h1 className="text-4xl font-extrabold text-center text-gray-800 px-8">
            Meet Our Team!
          </h1>
          <div className="absolute w-24 h-1 bg-gradient-to-l from-blue-500 to-transparent right-1/2 translate-x-32 top-1/2"></div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 py-6 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:px-24 px-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-b from-blue-100 via-white to-gray-50 rounded-tl-[2rem] rounded-br-[2rem] shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-96 object-cover rounded-tl-[2rem] rounded-br-[2rem]"
              />
            </div>
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-teal-500 transition-colors">
                {member.name}
              </h2>
              <p className="text-gray-600 mt-2">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
