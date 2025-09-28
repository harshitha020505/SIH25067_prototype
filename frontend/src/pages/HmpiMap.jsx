import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, MapPin, BarChart3, Info, Minimize2, Maximize2 } from 'lucide-react';

const HmpiMap = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your groundwater quality assistant. I can help you understand the HMPI (Heavy Metal Pollution Index) data, explain water quality conditions at different sites, and provide information about groundwater contamination. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const sites = {
    "Hyderabad": { name: "Hyderabad", hpi: 98.27, location: "Hyderabad area", status: "High pollution" },
    "Delhi": { name: "Delhi", hpi: 56.67, location: "Delhi", status: "Moderate pollution" },
    "Mumbai": { name: "Mumbai", hpi: 160.99, location: "Mumbai", status: "Very high pollution" },
    "Kolkata": { name: "Kolkata", hpi: 92.79, location: "Kolkata", status: "High pollution" },
    "Chennai": { name: "Chennai", hpi: 26.13, location: "Chennai", status: "Low pollution" }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getHPIInterpretation = (hpi) => {
    if (hpi > 150) return { level: "Critical", color: "text-red-800", description: "Extremely high heavy metal contamination. Water unsuitable for consumption." };
    if (hpi > 100) return { level: "Very High", color: "text-red-600", description: "Very high contamination levels. Immediate action required." };
    if (hpi > 75) return { level: "High", color: "text-orange-600", description: "High contamination. Water treatment strongly recommended." };
    if (hpi > 50) return { level: "Moderate", color: "text-yellow-600", description: "Moderate contamination. Regular monitoring needed." };
    if (hpi > 25) return { level: "Low-Moderate", color: "text-yellow-500", description: "Low to moderate contamination. Some treatment may be beneficial." };
    if (hpi > 10) return { level: "Low", color: "text-green-500", description: "Low contamination levels. Generally acceptable quality." };
    return { level: "Very Low", color: "text-green-600", description: "Very low contamination. Good water quality." };
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    for (const [key, site] of Object.entries(sites)) {
      if (message.includes(key.toLowerCase()) || message.includes(site.location.toLowerCase())) {
        const interpretation = getHPIInterpretation(site.hpi);
        return `**${site.name} Water Quality Report:**

📍 **Location:** ${site.location}
📊 **HPI Value:** ${site.hpi}
🚨 **Pollution Level:** ${interpretation.level}

**Assessment:** ${interpretation.description}

${site.hpi > 100 ? "⚠️ **Health Advisory:** This water requires immediate treatment before consumption. High levels of heavy metals detected." :
            site.hpi > 50 ? "⚠️ **Caution:** Water treatment recommended. Monitor heavy metal levels regularly." :
              "✅ **Status:** Water quality is within acceptable ranges for most uses."}

Would you like to know more about specific heavy metals or treatment options?`;
      }
    }

    if (message.includes('hpi') || message.includes('heavy metal')) {
      return `**Heavy Metal Pollution Index (HPI) Explained:**

The HPI is a comprehensive measure of heavy metal contamination in groundwater. Here's how to interpret the values:

🔴 **>150:** Critical contamination
🟠 **101-150:** Very high contamination  
🟡 **76-100:** High contamination
🟡 **51-75:** Moderate contamination
🟢 **26-50:** Low-moderate contamination
🟢 **11-25:** Low contamination
🟢 **0-10:** Very low contamination

**Current Site Status:**
• Mumbai: ${sites.Mumbai.hpi} (Critical)
• SiteA: ${sites.SiteA.hpi} (High)
• Kolkata: ${sites.Kolkata.hpi} (High)
• Delhi: ${sites.Delhi.hpi} (Moderate)
• Chennai: ${sites.Chennai.hpi} (Low-Moderate)`;
    }

    if (message.includes('water quality') || message.includes('quality')) {
      return `**Groundwater Quality Overview:**

Based on our monitoring data, here's the current water quality status across all sites:

🔴 **Critical Sites:** Mumbai (HPI: 160.99)
🟠 **High Pollution:** SiteA (98.27), Kolkata (92.79)
🟡 **Moderate Pollution:** Delhi (56.67)
🟢 **Better Quality:** Chennai (26.13)

**Key Concerns:**
• Heavy metal contamination varies significantly across regions
• Mumbai shows the highest contamination levels
• Chennai has the best water quality among monitored sites

Would you like detailed information about any specific location?`;
    }

    if (message.includes('treatment') || message.includes('purification')) {
      return `**Water Treatment Recommendations:**

**For High HPI Areas (>100):**
• Reverse osmosis systems
• Ion exchange treatment
• Activated carbon filtration
• Professional water testing recommended

**For Moderate HPI Areas (50-100):**
• Multi-stage filtration
• Regular water testing
• Consider bottled water for drinking

**For Low HPI Areas (<50):**
• Basic filtration may suffice
• Regular monitoring advised
• Boiling for bacterial safety

**Professional Consultation:** For areas with HPI >100, consult water treatment specialists for customized solutions.`;
    }

    if (message.includes('health') || message.includes('effects')) {
      return `**Health Effects of Heavy Metal Contamination:**

**High Exposure Risks:**
• Lead: Neurological damage, developmental issues
• Mercury: Brain and kidney damage
• Arsenic: Cancer risk, skin problems
• Cadmium: Kidney damage, bone disease
• Chromium: Respiratory issues, skin irritation

**Symptoms to Watch:**
• Gastrointestinal issues
• Fatigue and weakness
• Skin problems
• Neurological symptoms

**Recommendations:**
• Use treated/filtered water in high HPI areas
• Regular health checkups in contaminated zones
• Avoid long-term consumption of untreated water from high HPI sources

⚠️ **Important:** This is general information. Consult healthcare professionals for specific health concerns.`;
    }

    const responses = [
      `I can help you with information about:

🗺️ **Site Information:** Ask about specific cities (Mumbai, Delhi, Chennai, Kolkata, SiteA)
📊 **HPI Values:** Learn about Heavy Metal Pollution Index readings
💧 **Water Quality:** Get detailed quality assessments
🏥 **Health Effects:** Understand contamination health impacts
🔧 **Treatment Options:** Find appropriate water treatment solutions
📈 **Monitoring:** Learn about water quality monitoring

What would you like to know more about?`,

      `The map shows groundwater quality data across 5 monitoring sites in India. Each site has a different Heavy Metal Pollution Index (HPI) value:

• **Mumbai:** Highest contamination (160.99 HPI)
• **SiteA (Hyderabad area):** High contamination (98.27 HPI)  
• **Kolkata:** High contamination (92.79 HPI)
• **Delhi:** Moderate contamination (56.67 HPI)
• **Chennai:** Lowest contamination (26.13 HPI)

Which site would you like to learn more about?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What is HPI?",
    "Mumbai water quality",
    "Health effects",
    "Treatment options"
  ];

  return (
    <div className="relative w-full min-h-screen h-full bg-gray-50">
      {/* Map Info Section */}
      <div className="p-4 bg-white shadow-md border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          HMPI Groundwater Quality Map
        </h2>
        <p className="text-sm text-gray-600">
          This interactive map shows groundwater quality across monitoring sites in India
          based on the <strong>Heavy Metal Pollution Index (HPI)</strong>.
          Higher HPI values indicate higher contamination.
        </p>
      </div>
      <div className="w-full" style={{ height: "calc(100vh - 50px)" }}>
        <iframe
          src="/hmpi_map.html"
          title="HMPI Groundwater Quality Map"
          width="100%"
          height="100%"
          className="border-none"
        />
      </div>


      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-5 right-5 w-12 h-12 rounded-full shadow-lg z-50 group
               bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
               flex items-center justify-center transition-transform duration-300 hover:scale-105"
        >
          <MessageCircle size={22} className="text-white" />

          {/* Tooltip */}
          <span className="absolute bottom-14 right-1/2 translate-x-1/2 bg-gray-900 text-white 
                     px- py-1 rounded-md text-xs opacity-0 group-hover:opacity-100
                     transition-opacity shadow-md">
            Ask about water quality
          </span>

          {/* Pulse effect */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40 animate-ping"></span>
        </button>
      )}


      {isChatOpen && (
        <div
          className={`fixed bottom-8 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${isMinimized ? "w-64 h-12" : "w-80 max-h-[90vh] flex flex-col"
            }`}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <BarChart3 size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Water Quality Assistant</h3>
                <p className="text-[10px] text-blue-100">HMPI Data & Analysis</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white p-1 rounded"
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"
                      }`}
                  >
                    <div
                      className={`max-w-[80%] p-2.5 rounded-xl text-sm ${message.isBot
                        ? "bg-gray-100 text-gray-800 rounded-bl-md"
                        : "bg-blue-600 text-white rounded-br-md"
                        }`}
                    >
                      <div className="whitespace-pre-line">
                        {message.text.split("**").map((part, index) =>
                          index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                        )}
                      </div>
                      <div
                        className={`text-[10px] mt-1 ${message.isBot ? "text-gray-500" : "text-blue-100"
                          }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 p-2.5 rounded-xl rounded-bl-md max-w-[80%]">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="px-3 py-2 border-t border-gray-100">
                <div className="text-[11px] text-gray-600 mb-1">
                  Quick questions:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(question);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="text-[9px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about HPI, sites, or risks..."
                    className="flex-1 p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2.5 rounded-xl transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
                <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                  <Info size={10} />
                  Ask about cities, HPI, health effects, or treatments
                </div>
              </div>
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default HmpiMap;