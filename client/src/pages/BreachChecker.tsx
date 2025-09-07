import React, { useState } from 'react';
import { Shield, Mail, Lock, AlertTriangle, CheckCircle, XCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { breachService } from '../services/breachService';
import BreachCard from '../components/BreachCard';
import AIChat from '../components/AIChat';

interface BreachResult {
  isExposed: boolean;
  breachCount: number;
  breaches: Array<{
    name: string;
    title: string;
    domain: string;
    breachDate: string;
    description: string;
    dataClasses: string[];
    pwnCount: number;
  }>;
}

interface PasswordResult {
  isExposed: boolean;
  exposureCount: number;
  riskLevel: string;
}

const BreachChecker: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'email' | 'password'>('email');
  const [loading, setLoading] = useState(false);
  const [emailResult, setEmailResult] = useState<BreachResult | null>(null);
  const [passwordResult, setPasswordResult] = useState<PasswordResult | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);

  const handleEmailCheck = async () => {
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    setLoading(true);
    try {
      const result = await breachService.checkEmail(email);
      setEmailResult(result);
      toast.success('Email check completed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to check email');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordCheck = async () => {
    if (!password.trim()) {
      toast.error('Please enter a password');
      return;
    }

    setLoading(true);
    try {
      const result = await breachService.checkPassword(password);
      setPasswordResult(result);
      toast.success('Password check completed');
    } catch (error: any) {
      toast.error(error.message || 'Failed to check password');
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'safe': return 'text-success-600 bg-success-100';
      case 'low': return 'text-warning-600 bg-warning-100';
      case 'medium': return 'text-warning-600 bg-warning-100';
      case 'high': return 'text-danger-600 bg-danger-100';
      case 'critical': return 'text-danger-600 bg-danger-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskLevelIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'safe': return <CheckCircle className="w-5 h-5" />;
      case 'low': return <AlertTriangle className="w-5 h-5" />;
      case 'medium': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <XCircle className="w-5 h-5" />;
      case 'critical': return <XCircle className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Breach Checker</h1>
        <p className="text-lg text-gray-600">
          Check if your email or password has been exposed in data breaches
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
        <button
          onClick={() => setActiveTab('email')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors duration-200 ${
            activeTab === 'email'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Check Email</span>
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors duration-200 ${
            activeTab === 'password'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Check Password</span>
        </button>
      </div>

      {/* Email Check Form */}
      {activeTab === 'email' && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Email Breach Check
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="input-field"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleEmailCheck}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Shield className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Checking...' : 'Check Email'}
            </button>
          </div>
        </div>
      )}

      {/* Password Check Form */}
      {activeTab === 'password' && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Password Breach Check
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Your password is hashed locally and only the first 5 characters are sent to the API
              </p>
            </div>
            <button
              onClick={handlePasswordCheck}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Shield className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Checking...' : 'Check Password'}
            </button>
          </div>
        </div>
      )}

      {/* Email Results */}
      {emailResult && (
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              {emailResult.isExposed ? (
                <XCircle className="w-6 h-6 text-danger-600 mr-2" />
              ) : (
                <CheckCircle className="w-6 h-6 text-success-600 mr-2" />
              )}
              Email Check Results
            </h2>
            <button
              onClick={() => setShowAIChat(true)}
              className="btn-secondary text-sm"
            >
              Get AI Recommendations
            </button>
          </div>

          <div className={`p-4 rounded-lg border-2 mb-6 ${
            emailResult.isExposed ? 'border-danger-200 bg-danger-50' : 'border-success-200 bg-success-50'
          }`}>
            <div className="flex items-center">
              {emailResult.isExposed ? (
                <XCircle className="w-8 h-8 text-danger-600 mr-3" />
              ) : (
                <CheckCircle className="w-8 h-8 text-success-600 mr-3" />
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {emailResult.isExposed ? 'Email Found in Breaches' : 'Email Not Found in Breaches'}
                </h3>
                <p className="text-gray-600">
                  {emailResult.isExposed 
                    ? `Your email was found in ${emailResult.breachCount} data breach(es)`
                    : 'Your email address has not been found in any known data breaches'
                  }
                </p>
              </div>
            </div>
          </div>

          {emailResult.isExposed && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Breach Details</h3>
              {emailResult.breaches.map((breach, index) => (
                <BreachCard key={index} breach={breach} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Password Results */}
      {passwordResult && (
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              {getRiskLevelIcon(passwordResult.riskLevel)}
              <span className="ml-2">Password Check Results</span>
            </h2>
            <button
              onClick={() => setShowAIChat(true)}
              className="btn-secondary text-sm"
            >
              Get AI Recommendations
            </button>
          </div>

          <div className={`p-4 rounded-lg border-2 mb-6 ${
            passwordResult.isExposed ? 'border-danger-200 bg-danger-50' : 'border-success-200 bg-success-50'
          }`}>
            <div className="flex items-center">
              {getRiskLevelIcon(passwordResult.riskLevel)}
              <div className="ml-3">
                <h3 className="text-lg font-semibold">
                  {passwordResult.isExposed ? 'Password Found in Breaches' : 'Password Not Found in Breaches'}
                </h3>
                <p className="text-gray-600">
                  {passwordResult.isExposed 
                    ? `Your password hash was found ${passwordResult.exposureCount} time(s) in breach databases`
                    : 'Your password hash has not been found in any known breach databases'
                  }
                </p>
                {passwordResult.isExposed && (
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium mt-2 ${getRiskLevelColor(passwordResult.riskLevel)}`}>
                    Risk Level: {passwordResult.riskLevel.toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Modal */}
      {showAIChat && (
        <AIChat
          context={{
            email: emailResult ? email : null,
            breaches: emailResult?.breaches || [],
            passwordExposed: passwordResult?.isExposed || false
          }}
          onClose={() => setShowAIChat(false)}
        />
      )}
    </div>
  );
};

export default BreachChecker;
