import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Search, MessageCircle, Lock, Eye, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          AI-Powered Security
          <span className="text-primary-600"> Breach Checker</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Check if your email or password has been exposed in data breaches. 
          Get personalized security recommendations powered by AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/check" className="btn-primary text-lg px-8 py-3">
            <Search className="w-5 h-5 inline mr-2" />
            Check Now
          </Link>
          <Link to="/ai-chat" className="btn-secondary text-lg px-8 py-3">
            <MessageCircle className="w-5 h-5 inline mr-2" />
            Ask AI Assistant
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Breach Detection</h3>
          <p className="text-gray-600">
            Check if your email or password has been exposed in known data breaches using the HaveIBeenPwned database.
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3">AI Assistant</h3>
          <p className="text-gray-600">
            Get personalized security recommendations and ask questions about your breach results in natural language.
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
          <p className="text-gray-600">
            Your data is never stored. All checks are performed securely without logging sensitive information.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
              1
            </div>
            <h3 className="font-semibold mb-2">Enter Your Email</h3>
            <p className="text-sm text-gray-600">Provide your email address or password hash</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
              2
            </div>
            <h3 className="font-semibold mb-2">Check Database</h3>
            <p className="text-sm text-gray-600">We search the HaveIBeenPwned breach database</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
              3
            </div>
            <h3 className="font-semibold mb-2">Get Results</h3>
            <p className="text-sm text-gray-600">View detailed breach information and risk assessment</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
              4
            </div>
            <h3 className="font-semibold mb-2">AI Recommendations</h3>
            <p className="text-sm text-gray-600">Receive personalized security advice</p>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-white rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Security Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-success-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Rate Limited</h3>
              <p className="text-sm text-gray-600">Built-in protection against abuse with request limits</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-success-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">No Data Storage</h3>
              <p className="text-sm text-gray-600">Your information is never stored or logged</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-success-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Secure API</h3>
              <p className="text-sm text-gray-600">Uses k-anonymity model for password checking</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-success-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Input Validation</h3>
              <p className="text-sm text-gray-600">Comprehensive validation and sanitization</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-12 bg-primary-50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Check Your Security?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Don't wait until it's too late. Check your accounts now and get personalized security recommendations.
        </p>
        <Link to="/check" className="btn-primary text-lg px-8 py-3">
          <Eye className="w-5 h-5 inline mr-2" />
          Start Checking
        </Link>
      </div>
    </div>
  );
};

export default Home;
