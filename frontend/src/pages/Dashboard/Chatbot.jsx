import { useState, useEffect, useRef } from "react";
import { MessageCircle, BarChart3, Minimize2, Maximize2, Send, Info, X } from "lucide-react";



export default function ChatBot({ isQualityInspector, activeTab }) {
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

    // Context-aware responses based on active tab
    if (message.includes('current') || message.includes('section') || message.includes('page')) {
      const tabInfo = {
        'maps': 'You are currently viewing the **Maps** section. Here you can visualize groundwater quality data across different locations with interactive maps showing HPI values and contamination levels.',
        'dss': 'You are in the **Decision Support System (DSS)** section. This provides data-driven recommendations and analysis tools to help you make informed decisions about groundwater management.',
        'hmpi': 'You are viewing the **HMPI Analysis** section. This shows detailed Heavy Metal Pollution Index calculations and visualizations for monitored sites.',
        'forecast': 'You are in the **Forecast** section. Here you can view predictions and trends for groundwater quality based on historical data and current patterns.',
        'reports': 'You are viewing the **Reports** section. This allows you to generate, view, and export detailed reports on groundwater quality assessments.',
        'alerts': 'You are in the **Alerts** section. This shows critical notifications and warnings about water quality issues that require immediate attention.'
      };
      return tabInfo[activeTab] || 'I can help you navigate through different sections and understand the data.';
    }

    // Site-specific queries
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

    // HPI and heavy metal information
    if (message.includes('hpi') || message.includes('heavy metal') || message.includes('index')) {
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
• Hyderabad: ${sites.Hyderabad.hpi} (High)
• Kolkata: ${sites.Kolkata.hpi} (High)
• Delhi: ${sites.Delhi.hpi} (Moderate)
• Chennai: ${sites.Chennai.hpi} (Low-Moderate)

**Common Heavy Metals Monitored:**
• Arsenic (As) - Limit: 0.01 mg/L
• Lead (Pb) - Limit: 0.01 mg/L
• Cadmium (Cd) - Limit: 0.003 mg/L
• Mercury (Hg) - Limit: 0.001 mg/L
• Chromium (Cr) - Limit: 0.05 mg/L
• Nickel (Ni) - Limit: 0.02 mg/L`;
    }

    // Water quality overview
    if (message.includes('water quality') || message.includes('quality') || message.includes('overview')) {
      return `**Groundwater Quality Overview:**

Based on our monitoring data, here's the current water quality status across all sites:

🔴 **Critical Sites:** Mumbai (HPI: 160.99)
🟠 **High Pollution:** Hyderabad (98.27), Kolkata (92.79)
🟡 **Moderate Pollution:** Delhi (56.67)
🟢 **Better Quality:** Chennai (26.13)

**Key Concerns:**
• Heavy metal contamination varies significantly across regions
• Mumbai shows the highest contamination levels
• Chennai has the best water quality among monitored sites

**Recommended Actions:**
• High HPI areas (>100): Immediate treatment required
• Moderate HPI areas (50-100): Regular monitoring and testing
• Low HPI areas (<50): Periodic quality checks

Would you like detailed information about any specific location?`;
    }

    // Treatment options
    if (message.includes('treatment') || message.includes('purification') || message.includes('filter')) {
      return `**Water Treatment Recommendations:**

**For High HPI Areas (>100):**
• Reverse osmosis systems
• Ion exchange treatment
• Activated carbon filtration
• Professional water testing recommended
• Multi-barrier approach for safety

**For Moderate HPI Areas (50-100):**
• Multi-stage filtration
• Regular water testing (monthly)
• Consider bottled water for drinking
• UV purification for additional safety

**For Low HPI Areas (<50):**
• Basic filtration may suffice
• Regular monitoring advised (quarterly)
• Boiling for bacterial safety
• Standard water purifiers

**Professional Consultation:** For areas with HPI >100, consult water treatment specialists for customized solutions.

**Maintenance Tips:**
• Replace filters as per manufacturer guidelines
• Regular testing of treated water
• Keep maintenance records`;
    }

    // Health effects
    if (message.includes('health') || message.includes('effects') || message.includes('risk') || message.includes('impact')) {
      return `**Health Effects of Heavy Metal Contamination:**

**Acute Exposure Risks:**
• **Lead:** Neurological damage, developmental issues in children
• **Mercury:** Brain and kidney damage, memory problems
• **Arsenic:** Cancer risk, skin problems, cardiovascular issues
• **Cadmium:** Kidney damage, bone disease (Itai-itai disease)
• **Chromium:** Respiratory issues, skin irritation, allergies

**Chronic Exposure Symptoms:**
• Gastrointestinal disturbances
• Chronic fatigue and weakness
• Skin problems and discoloration
• Neurological symptoms (tremors, numbness)
• Immune system suppression

**Vulnerable Groups:**
• Pregnant women and fetuses
• Children under 6 years
• Elderly individuals
• People with existing health conditions

**Recommendations:**
• Use treated/filtered water in high HPI areas
• Regular health checkups in contaminated zones
• Avoid long-term consumption of untreated water
• Follow local health advisory guidelines

⚠️ **Important:** This is general information. Consult healthcare professionals for specific health concerns.`;
    }

    // DSS-specific queries
    if (message.includes('dss') || message.includes('decision') || message.includes('recommend')) {
      return `**Decision Support System (DSS) Features:**

The DSS helps you make data-driven decisions about groundwater management:

**Key Capabilities:**
• Automated analysis of water quality trends
• Risk assessment and prioritization
• Treatment recommendation engine
• Resource allocation optimization
• Compliance tracking with standards

**How to Use DSS:**
1. Navigate to the DSS section
2. Select your area of interest
3. Review automated recommendations
4. Export reports for action planning

**DSS Benefits:**
• Reduces manual analysis time
• Provides standardized assessments
• Identifies emerging trends early
• Supports regulatory compliance

Would you like guidance on using any specific DSS feature?`;
    }

    // Forecasting
    if (message.includes('forecast') || message.includes('predict') || message.includes('trend')) {
      return `**Water Quality Forecasting:**

Our forecasting system uses historical data and current trends to predict future water quality:

**Forecast Types:**
• Short-term (1-3 months): Immediate quality trends
• Medium-term (3-6 months): Seasonal variations
• Long-term (1 year+): Strategic planning insights

**Forecasting Factors:**
• Historical HPI trends
• Seasonal patterns
• Rainfall and recharge data
• Industrial activity changes
• Agricultural practices

**Using Forecasts:**
• Plan preventive measures
• Schedule monitoring activities
• Budget resource allocation
• Communicate with stakeholders

**Accuracy Notes:**
Forecasts are probabilistic and should be combined with regular testing for best results.`;
    }

    // Reports
    if (message.includes('report') || message.includes('export') || message.includes('document')) {
      return `**Reports & Documentation:**

The system can generate various types of reports:

**Available Reports:**
📊 **Summary Reports:** Overview of all sites
📈 **Trend Analysis:** Historical data visualization
📋 **Site-Specific:** Detailed individual location reports
🚨 **Alert Reports:** Critical incidents and advisories
📅 **Periodic Reports:** Monthly/quarterly summaries

**Export Options:**
• PDF format (printable)
• Excel/CSV (data analysis)
• Interactive HTML dashboards

**Report Contents:**
• HPI values and interpretations
• Heavy metal concentrations
• Trend charts and graphs
• Compliance status
• Recommendations

Navigate to the Reports section to generate custom reports!`;
    }

    // Default responses
    const responses = [
      `I can help you with information about:

🗺️ **Site Information:** Ask about specific cities (Mumbai, Delhi, Chennai, Kolkata, Hyderabad)
📊 **HPI Values:** Learn about Heavy Metal Pollution Index readings
💧 **Water Quality:** Get detailed quality assessments
🏥 **Health Effects:** Understand contamination health impacts
🔧 **Treatment Options:** Find appropriate water treatment solutions
📈 **Monitoring:** Learn about water quality monitoring
🎯 **DSS:** Understand Decision Support System features
📋 **Reports:** Generate and export quality reports

What would you like to know more about?`,

      `The dashboard provides comprehensive groundwater quality monitoring. Here's what you can do:

**Current Capabilities:**
• View real-time HPI data across 5 major cities
• Analyze heavy metal concentrations
• Generate quality reports
• Set up custom alerts
• Access treatment recommendations
• Use forecasting tools

**Need Help With:**
• Understanding HPI values?
• Interpreting water quality data?
• Finding treatment options?
• Generating reports?

Just ask - I'm here to help! You can also type "help" to see all available topics.`
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

  // Only show for Quality Inspector
  if (!isQualityInspector) return null;

  return (
    <>
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 group
               bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
               flex items-center justify-center transition-transform duration-300 hover:scale-110"
        >
          <MessageCircle size={24} className="text-white" />

          <span className="absolute bottom-16 right-0 translate-x-1/2 bg-gray-900 text-white 
                     px-3 py-1.5 rounded-md text-xs opacity-0 group-hover:opacity-100
                     transition-opacity shadow-md whitespace-nowrap">
            Ask about water quality
          </span>

          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40 animate-ping"></span>
        </button>
      )}

      {isChatOpen && (
        <div
          className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${isMinimized ? "w-72 h-14" : "w-96 max-h-[600px] flex flex-col"
            }`}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <BarChart3 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Water Quality Assistant</h3>
                <p className="text-xs text-blue-100">HMPI Data & Analysis</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white p-1.5 rounded hover:bg-white/10 transition"
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white p-1.5 rounded hover:bg-white/10 transition"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-xl text-sm ${message.isBot
                          ? "bg-white text-gray-800 rounded-bl-sm shadow-sm"
                          : "bg-blue-600 text-white rounded-br-sm"
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
                    <div className="bg-white text-gray-800 p-3 rounded-xl rounded-bl-sm max-w-[85%] shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="px-4 py-2 bg-white border-t border-gray-100">
                <div className="text-xs text-gray-600 mb-2 font-medium">
                  Quick questions:
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(question);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors font-medium"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about HPI, sites, or risks..."
                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-3 rounded-xl transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <Info size={12} />
                  Ask about cities, HPI, health effects, or treatments
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};