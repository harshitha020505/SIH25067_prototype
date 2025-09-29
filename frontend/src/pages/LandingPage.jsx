import React from 'react'
import SandwichMenu from './LandingPage/SandwichMenu'
import LandingPageHero from './LandingPage/LandingPageHero'
import { TrendingUp, Users, FileText } from 'lucide-react';
import { AlertTriangle, Clock, Globe } from 'lucide-react';
import { Mail, Phone, MapPin as Location } from 'lucide-react';

export default function landingPage() {
  return (
    <div>
      <SandwichMenu />
      <LandingPageHero />
      <section id="problem" className="min-h-[70vh] py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* Left text block */}
            <div className="space-y-6 max-w-[40vw]">
              <div className="text-center md:text-left mb-6">
                <h2 className="text-2xl md:text-4xl font-bold text-blue-800 mb-2 tracking-tight">
                  <span className="text-5xl md:text-6xl text-blue-900">C</span>
                  <span className="align-baseline text-blue-900">RITICAL</span>
                  <span className="text-5xl md:text-6xl ml-3 text-blue-900">C</span>
                  <span className="align-baseline text-blue-900">HALLENGES</span>
                </h2>
                <p className="text-sm md:text-base ml-1 text-gray-700 max-w-2xl leading-relaxed">
                  Heavy metal contamination in groundwater poses severe health risks,
                  yet current assessment methods are inadequate for modern needs.
                </p>
              </div>
            </div>

            {/* Right cards block */}
            <div className="grid grid-cols-1 gap-4 w-full">
              {[
                {
                  icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
                  title: "Rising Contamination",
                  description:
                    "Industrial activities and agricultural practices are increasing heavy metal presence in groundwater."
                },
                {
                  icon: <Users className="w-6 h-6 text-blue-600" />,
                  title: "Health Risks",
                  description:
                    "Even trace levels of heavy metals can cause neurological disorders, organ damage, and cancer."
                },
                {
                  icon: <FileText className="w-6 h-6 text-blue-600" />,
                  title: "Manual Processes",
                  description:
                    "Current assessment methods are slow, error-prone, and inconsistent across laboratories."
                },
                {
                  icon: <Clock className="w-6 h-6 text-blue-600" />,
                  title: "Delayed Reporting",
                  description:
                    "Conventional reporting takes weeks to months, delaying critical interventions and policy responses."
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-5 border border-blue-200 rounded-lg bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-md">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-black mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="bg-blue-50 text-blue-800 py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Groundwater Quality & Safety
          </h2>
          <p className="text-lg md:text-xl text-blue-700 mb-8">
            Assessing the health of India’s groundwater through data-driven
            monitoring, AI forecasting, and early-warning alerts.
          </p>

          <div className="inline-block bg-blue-100 text-blue-900 px-6 py-3 rounded-2xl shadow-md mb-10">
            <p className="font-medium">
              Purpose: To safeguard communities with timely alerts and insights
              on groundwater safety.
            </p>
          </div>

          {/* Add your map image */}
          <img
            src="/images/India_image.png"   // place image in public/ folder
            alt="Groundwater Assessment Map of India"
            className="rounded-2xl border-2 border-black shadow-lg mx-auto w-full md:w-4/5"
          />
        </div>
      </section>

      <section id="statistics" className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className=" mb-12">
            <h2 className="text-2xl md:text-5xl w-[60vw] leading-[1.2] text-left font-bold text-blue-800 mb-4">
              Impact of the Solution
            </h2>
            <p className="text-xs  md:text-[15px]  text-blue-400 max-w-2xl mr leading-relaxed">
              A comparison of groundwater monitoring before and after the adoption
              of our automated Heavy Metal Pollution Index system.
            </p>
          </div>

          {/* Two Column Stats */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Before */}
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                Current Scenario
              </h3>
              <div className="space-y-6">
                {[
                  {
                    value: "6–12 months",
                    label: "Delay in contamination reporting"
                  },
                  {
                    value: "High",
                    label: "Error-prone manual testing processes"
                  },
                  {
                    value: "Limited",
                    label: "Data accessibility & visualization"
                  },
                  {
                    value: "Reactive",
                    label: "Policy interventions happen after damage is done"
                  }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="p-6 bg-gray-900 text-white rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-6 text-center">
                Improved with HPI Platform
              </h3>
              <div className="space-y-6">
                {[
                  {
                    value: "Real-time",
                    label: "Automated contamination alerts"
                  },
                  {
                    value: "95%+",
                    label: "Accuracy in testing & analysis"
                  },
                  {
                    value: "Open Access",
                    label: "Centralized visualization & reports"
                  },
                  {
                    value: "Proactive",
                    label: "Early interventions & preventive actions"
                  }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-700 rounded-lg"
                  >
                    <span className="text-sm">{stat.label}</span>
                    <span className="text-lg font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-100  00">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left - Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                Connect with the Central Ground Water Board team for inquiries, collaborations,
                or details about the Heavy Metal Pollution Index (HMPI).
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-800" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">hmpi@cgwb.gov.in</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-800" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">+91-11-2345-6789</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Location className="w-5 h-5 text-gray-800" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Address</div>
                    <div className="text-gray-600">
                      Central Ground Water Board <br />
                      Ministry of Jal Shakti, New Delhi
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="px-4 py-3 rounded-md border border-gray-300 focus:border-black focus:outline-none text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="px-4 py-3 rounded-md border border-gray-300 focus:border-black focus:outline-none text-sm"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-black focus:outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="Organization"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-black focus:outline-none text-sm"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-black focus:outline-none text-sm resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors text-sm"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>



    </div>
  )
}
