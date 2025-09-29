import React, { useState } from 'react';
import { Calculator, BookOpen, AlertTriangle, TrendingUp, Info, ChevronDown, ChevronUp, Beaker, FileText, Database } from 'lucide-react';

const Calculation = () => {
  const [expandedSection, setExpandedSection] = useState('overview');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const heavyMetals = [
    { symbol: 'As', name: 'Arsenic', limit: 10, desirable: 50, unit: 'μg/L' },
    { symbol: 'Cd', name: 'Cadmium', limit: 3, desirable: '-', unit: 'μg/L' },
    { symbol: 'Cu', name: 'Copper', limit: 50, desirable: 1500, unit: 'μg/L' },
    { symbol: 'Cr', name: 'Chromium', limit: 50, desirable: '-', unit: 'μg/L' },
    { symbol: 'Fe', name: 'Iron', limit: 300, desirable: '-', unit: 'μg/L' },
    { symbol: 'Mn', name: 'Manganese', limit: 100, desirable: 300, unit: 'μg/L' },
    { symbol: 'Ni', name: 'Nickel', limit: 20, desirable: '-', unit: 'μg/L' },
    { symbol: 'Pb', name: 'Lead', limit: 10, desirable: '-', unit: 'μg/L' },
    { symbol: 'Zn', name: 'Zinc', limit: 5000, desirable: 15000, unit: 'μg/L' }
  ];

  const pollutionIndices = [
    {
      name: 'HPI',
      fullName: 'Heavy Metal Pollution Index',
      critical: 100,
      categories: [
        { range: '< 25', level: 'Excellent', color: 'bg-green-100 text-green-800' },
        { range: '25-50', level: 'Good', color: 'bg-blue-100 text-blue-800' },
        { range: '50-75', level: 'Poor', color: 'bg-yellow-100 text-yellow-800' },
        { range: '75-100', level: 'Very Poor', color: 'bg-orange-100 text-orange-800' },
        { range: '> 100', level: 'Unsuitable', color: 'bg-red-100 text-red-800' }
      ]
    },
    {
      name: 'HEI',
      fullName: 'Heavy Metal Evaluation Index',
      critical: 'Variable',
      categories: [
        { range: '< Mean', level: 'Low Pollution', color: 'bg-green-100 text-green-800' },
        { range: 'Mean to 2×Mean', level: 'Moderate Pollution', color: 'bg-yellow-100 text-yellow-800' },
        { range: '> 2×Mean', level: 'High Pollution', color: 'bg-red-100 text-red-800' }
      ]
    },
    {
      name: 'CI',
      fullName: 'Contamination Index',
      critical: 3,
      categories: [
        { range: '< 1', level: 'Low', color: 'bg-green-100 text-green-800' },
        { range: '1-3', level: 'Moderate', color: 'bg-yellow-100 text-yellow-800' },
        { range: '> 3', level: 'High', color: 'bg-red-100 text-red-800' }
      ]
    },
    {
      name: 'EHCI',
      fullName: 'Entropy-Weight Heavy Metal Contamination Index',
      critical: 200,
      categories: [
        { range: '< 50', level: 'Excellent', color: 'bg-green-100 text-green-800' },
        { range: '50-100', level: 'Good', color: 'bg-blue-100 text-blue-800' },
        { range: '100-150', level: 'Average', color: 'bg-yellow-100 text-yellow-800' },
        { range: '150-200', level: 'Poor', color: 'bg-orange-100 text-orange-800' },
        { range: '> 200', level: 'Unsuitable', color: 'bg-red-100 text-red-800' }
      ]
    },
    {
      name: 'HMI',
      fullName: 'Heavy Metal Index',
      critical: 300,
      categories: [
        { range: '< 50', level: 'Excellent', color: 'bg-green-100 text-green-800' },
        { range: '50-100', level: 'Good', color: 'bg-blue-100 text-blue-800' },
        { range: '100-200', level: 'Average', color: 'bg-yellow-100 text-yellow-800' },
        { range: '200-300', level: 'Poor', color: 'bg-orange-100 text-orange-800' },
        { range: '> 300', level: 'Unsuitable', color: 'bg-red-100 text-red-800' }
      ]
    },
    {
      name: 'PMI',
      fullName: 'PCA-Based Metal Index',
      critical: 'Quantile-based',
      categories: [
        { range: 'Q1 (0-33%)', level: 'Low Pollution', color: 'bg-green-100 text-green-800' },
        { range: 'Q2 (33-66%)', level: 'Moderate Pollution', color: 'bg-yellow-100 text-yellow-800' },
        { range: 'Q3 (66-100%)', level: 'High Pollution', color: 'bg-red-100 text-red-800' }
      ]
    }
  ];

  const Section = ({ id, title, icon: Icon, children }) => (
    <div className="bg-white rounded-xl shadow-lg mb-4 overflow-hidden border border-blue-100">
      <button
        onClick={() => toggleSection(id)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Icon size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-blue-900">{title}</h2>
        </div>
        {expandedSection === id ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-blue-600" />}
      </button>
      {expandedSection === id && (
        <div className="p-6 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-8 mb-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Beaker size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Heavy Metal Pollution Index (HMPI)</h1>
              <p className="text-blue-100 mt-2">Comprehensive Guide to Groundwater Quality Assessment</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="text-blue-100 text-sm">Monitored Metals</p>
              <p className="text-3xl font-bold">9</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="text-blue-100 text-sm">Pollution Indices</p>
              <p className="text-3xl font-bold">6</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="text-blue-100 text-sm">Standards</p>
              <p className="text-3xl font-bold">BIS 2012</p>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <Section id="overview" title="Overview & Importance" icon={BookOpen}>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Heavy Metal Pollution Indices are comprehensive measures used to assess the contamination level of groundwater 
              by toxic heavy metals. These indices help evaluate water quality, identify pollution sources, and guide 
              remediation efforts.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mb-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Info size={20} />
                Why HMPI Matters
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Heavy metals remain toxic even at trace levels</li>
                <li>• Bioaccumulation in human body causes severe health issues</li>
                <li>• Non-biodegradable and persist in environment</li>
                <li>• Affects drinking water safety for millions</li>
                <li>• Essential for regulatory compliance and public health protection</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Natural Sources</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Rock weathering and mineral dissolution</li>
                  <li>• Geological formations (limestone, shale)</li>
                  <li>• Volcanic activity</li>
                  <li>• Soil leaching</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">Anthropogenic Sources</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Industrial discharge and mining</li>
                  <li>• Agricultural fertilizers and pesticides</li>
                  <li>• Urban sewage and waste disposal</li>
                  <li>• Atmospheric deposition</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Heavy Metals Table */}
        <Section id="metals" title="Monitored Heavy Metals" icon={Database}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Symbol</th>
                  <th className="px-4 py-3 text-left">Metal Name</th>
                  <th className="px-4 py-3 text-left">Max Permissible Limit</th>
                  <th className="px-4 py-3 text-left">Max Desirable Limit</th>
                  <th className="px-4 py-3 text-left">Unit</th>
                </tr>
              </thead>
              <tbody>
                {heavyMetals.map((metal, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-bold text-blue-600">{metal.symbol}</td>
                    <td className="px-4 py-3 font-semibold">{metal.name}</td>
                    <td className="px-4 py-3">{metal.limit}</td>
                    <td className="px-4 py-3">{metal.desirable}</td>
                    <td className="px-4 py-3 text-gray-500">{metal.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4 italic">
            * Standards based on Bureau of Indian Standards (BIS) 10500:2012
          </p>
        </Section>

        {/* Calculation Methods */}
        <Section id="calculation" title="Calculation Methodologies" icon={Calculator}>
          <div className="space-y-6">
            {/* HPI */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-3">1. HPI (Heavy Metal Pollution Index)</h3>
              <div className="bg-white p-4 rounded-lg mb-3">
                <p className="font-mono text-sm text-gray-800 mb-2">
                  HPI = Σ(W<sub>i</sub> × Q<sub>i</sub>) / ΣW<sub>i</sub>
                </p>
                <p className="text-sm text-gray-700">
                  Where: W<sub>i</sub> = Unit weightage = 1/S<sub>i</sub>
                </p>
                <p className="text-sm text-gray-700">
                  Q<sub>i</sub> = Sub-index = 100 × [(O<sub>i</sub> - I<sub>i</sub>) / (S<sub>i</sub> - I<sub>i</sub>)]
                </p>
              </div>
              <div className="text-sm text-gray-700">
                <p><strong>O<sub>i</sub>:</strong> Observed concentration of metal i</p>
                <p><strong>S<sub>i</sub>:</strong> Maximum permissible limit</p>
                <p><strong>I<sub>i</sub>:</strong> Maximum desirable limit</p>
              </div>
            </div>

            {/* HEI */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-3">2. HEI (Heavy Metal Evaluation Index)</h3>
              <div className="bg-white p-4 rounded-lg mb-3">
                <p className="font-mono text-sm text-gray-800">
                  HEI = Σ(O<sub>i</sub> / S<sub>i</sub>)
                </p>
              </div>
              <p className="text-sm text-gray-700">
                Simpler method dividing observed concentration by maximum permissible limit and summing across all metals.
              </p>
            </div>

            {/* CI */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">3. CI (Contamination Index)</h3>
              <div className="bg-white p-4 rounded-lg mb-3">
                <p className="font-mono text-sm text-gray-800">
                  CI = Σ C<sub>Fi</sub>
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Where: C<sub>Fi</sub> = (C<sub>Oi</sub> / C<sub>Si</sub>) - 1
                </p>
              </div>
              <p className="text-sm text-gray-700">
                Summarizes contamination factors of metals exceeding permissible limits.
              </p>
            </div>

            {/* EHCI */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-3">4. EHCI (Entropy-Weight Heavy Metal Contamination Index)</h3>
              <div className="bg-white p-4 rounded-lg mb-3">
                <p className="font-mono text-sm text-gray-800">
                  EHCI = Σ(w<sub>i</sub> × Q<sub>i</sub>)
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Uses Shannon entropy to calculate objective weights (w<sub>i</sub>) for each metal
                </p>
              </div>
              <p className="text-sm text-gray-700">
                Advanced method using information entropy theory for objective weight assignment.
              </p>
            </div>

            {/* HMI */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-3">5. HMI (Heavy Metal Index)</h3>
              <div className="bg-white p-4 rounded-lg mb-3">
                <p className="font-mono text-sm text-gray-800">
                  HMI = Σ(p<sub>i</sub> × 100 × O<sub>i</sub> / I<sub>i</sub>)
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Where: p<sub>i</sub> = PCA-based weight (from factor loadings and eigenvalues)
                </p>
              </div>
              <p className="text-sm text-gray-700">
                Uses Principal Component Analysis for multivariate statistical weight determination.
              </p>
            </div>

            {/* PMI */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
              <h3 className="text-xl font-bold text-red-900 mb-3">6. PMI (PCA-Based Metal Index)</h3>
              <div className="bg-white p-4 rounded-lg mb-3">
                <p className="font-mono text-sm text-gray-800">
                  PMI = (NSPMI - NSPMI<sub>min</sub>) / (NSPMI<sub>max</sub> - NSPMI<sub>min</sub>)
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  NSPMI = Σ(FS<sub>i</sub> × V<sub>i</sub> / V<sub>t</sub>)
                </p>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Most robust method:</strong> Fully objective, doesn't require permissible limits, uses PCA factor scores.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <TrendingUp size={18} />
              Research Findings
            </h4>
            <p className="text-sm text-gray-700">
              Deep learning studies show that <strong>PMI achieved the highest prediction accuracy (R² = 0.99)</strong> compared 
              to other indices, making it the most reliable method for groundwater heavy metal pollution assessment.
            </p>
          </div>
        </Section>

        {/* Pollution Categories */}
        <Section id="categories" title="Pollution Classification & Critical Values" icon={AlertTriangle}>
          <div className="space-y-6">
            {pollutionIndices.map((index, idx) => (
              <div key={idx} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{index.name}</h3>
                    <p className="text-sm text-gray-600">{index.fullName}</p>
                  </div>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Critical: {index.critical}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {index.categories.map((cat, catIdx) => (
                    <div key={catIdx} className={`${cat.color} p-3 rounded-lg`}>
                      <p className="font-bold text-sm mb-1">{cat.range}</p>
                      <p className="text-xs font-semibold">{cat.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Health Impacts */}
        <Section id="health" title="Health Impacts & Recommendations" icon={AlertTriangle}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-5 rounded-xl border border-red-200">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle size={20} />
                Health Risks
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-red-800">Arsenic (As)</p>
                  <p className="text-gray-700">Skin lesions, cancer, cardiovascular disease</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-red-800">Lead (Pb)</p>
                  <p className="text-gray-700">Neurological damage, developmental issues in children</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-red-800">Cadmium (Cd)</p>
                  <p className="text-gray-700">Kidney damage, bone disease (Itai-itai disease)</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-red-800">Mercury (Hg)</p>
                  <p className="text-gray-700">Brain and kidney damage, memory problems</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-red-800">Chromium (Cr)</p>
                  <p className="text-gray-700">Respiratory issues, skin irritation, allergies</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <h3 className="text-lg font-bold text-green-900 mb-3">Recommendations</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-green-800">HPI/EHCI/HMI &gt; Critical Value</p>
                  <p className="text-gray-700">• Immediate treatment required<br/>• Reverse osmosis recommended<br/>• Professional testing advised</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-green-800">Moderate Contamination</p>
                  <p className="text-gray-700">• Multi-stage filtration<br/>• Regular monitoring<br/>• Consider bottled water</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-green-800">Low Contamination</p>
                  <p className="text-gray-700">• Basic filtration sufficient<br/>• Periodic quality checks<br/>• Standard purifiers adequate</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-green-800">Prevention Measures</p>
                  <p className="text-gray-700">• Regular water testing<br/>• Reduce fertilizer use<br/>• Proper waste disposal</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Research & References */}
        <Section id="research" title="Research Insights & Technology" icon={FileText}>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Deep Learning in HMPI Assessment</h3>
              <p className="text-gray-700 text-sm mb-3">
                Recent research has demonstrated the effectiveness of machine learning, particularly deep learning, 
                in predicting groundwater pollution indices with unprecedented accuracy.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">0.99</p>
                  <p className="text-xs text-gray-600">R² Accuracy (DL-PMI)</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">0.022</p>
                  <p className="text-xs text-gray-600">Mean Square Error</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">226</p>
                  <p className="text-xs text-gray-600">Sample Dataset Size</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">Key Research Findings</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• PMI outperformed all other indices with highest prediction accuracy</li>
                <li>• Deep learning models achieved 11% better accuracy than traditional ANN</li>
                <li>• Objective methods (EHCI, HMI, PMI) more reliable than subjective approaches</li>
                <li>• PCA-based methods don't require permissible limits, making them universally applicable</li>
                <li>• Batch normalization and ReLU activation improved model convergence</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Reference</h3>
              <p className="text-xs text-gray-600 italic">
                Singha, S., Pasupuleti, S., Singha, S.S., & Kumar, S. (2020). Effectiveness of groundwater heavy 
                metal pollution indices studies by deep-learning. Journal of Contaminant Hydrology, 235, 103718.
              </p>
            </div>
          </div>
        </Section>

        {/* Footer Note */}
        <div className="bg-blue-600 text-white p-6 rounded-xl text-center mt-6">
          <p className="text-sm">
            <strong>Note:</strong> This information is based on peer-reviewed research and BIS standards. 
            For specific water quality concerns, consult certified water testing laboratories and health professionals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculation;