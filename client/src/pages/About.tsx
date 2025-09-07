import React from 'react';
import { MessageCircle, Shield, Lock, AlertTriangle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About M&P Checker</h1>
        <p className="text-lg text-gray-600">
          Your trusted AI-powered security breach detection service
        </p>
      </div>

      <div className="space-y-8">
        {/* Mission */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-primary-600" />
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            M&P Checker was created to help individuals and organizations protect their digital identities 
            by providing easy access to breach detection services. We combine the power of the HaveIBeenPwned 
            database with AI-driven insights to give you personalized security recommendations.
          </p>
        </div>

        {/* How It Works */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-primary-600" />
            How It Works
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Email Checking</h3>
              <p className="text-gray-600">
                We use the HaveIBeenPwned API to check if your email address has been exposed in any known 
                data breaches. The API searches through billions of compromised accounts from hundreds 
                of data breaches.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Password Checking</h3>
              <p className="text-gray-600">
                For password checking, we use the k-anonymity model. Your password is hashed using SHA-1 
                locally, and only the first 5 characters of the hash are sent to the API. This ensures 
                your password never leaves your device in plain text.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">AI Recommendations</h3>
              <p className="text-gray-600">
                Our AI assistant analyzes your breach results and provides personalized security 
                recommendations, answers questions about your security status, and helps you understand 
                the implications of any breaches.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Lock className="w-6 h-6 mr-2 text-primary-600" />
            Privacy & Security
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">No Data Storage</h3>
              <p className="text-gray-600">
                We do not store any of your personal information. All checks are performed in real-time 
                and no data is logged or saved on our servers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Rate Limiting</h3>
              <p className="text-gray-600">
                We implement rate limiting to prevent abuse and ensure fair usage for all users. 
                Each IP address is limited to 100 requests per hour.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Secure Communication</h3>
              <p className="text-gray-600">
                All communication between your browser and our servers is encrypted using HTTPS. 
                We use industry-standard security practices to protect your data in transit.
              </p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-primary-600" />
            Data Sources
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">HaveIBeenPwned</h3>
              <p className="text-gray-600">
                We use the HaveIBeenPwned service created by Troy Hunt, which aggregates data from 
                hundreds of publicly known data breaches. This includes breaches from major companies 
                like Adobe, LinkedIn, Dropbox, and many others.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Breach Data</h3>
              <p className="text-gray-600">
                The breach data includes information about when breaches occurred, what data was 
                compromised, and how many accounts were affected. This helps you understand the 
                scope and severity of any breaches affecting your accounts.
              </p>
            </div>
          </div>
        </div>

        {/* AI Technology */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-primary-600" />
            AI Technology
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">OpenAI GPT-4</h3>
              <p className="text-gray-600">
                We use OpenAI's GPT-4 model to provide intelligent, personalized security recommendations. 
                The AI can understand natural language queries and provide context-aware advice based on 
                your specific breach results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Personalized Recommendations</h3>
              <p className="text-gray-600">
                The AI analyzes your breach data and provides specific recommendations for improving 
                your security posture. This includes advice on password management, two-factor 
                authentication, and other security best practices.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="card text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            Have questions about M&P Checker or need help with your security? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@mpchecker.com" 
              className="btn-primary"
            >
              Contact Support
            </a>
            <a 
              href="https://github.com/mpchecker" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
