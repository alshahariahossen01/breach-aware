import React from 'react';
import { Calendar, Users, Shield, AlertTriangle } from 'lucide-react';

interface BreachCardProps {
  breach: {
    name: string;
    title: string;
    domain: string;
    breachDate: string;
    description: string;
    dataClasses: string[];
    pwnCount: number;
  };
}

const BreachCard: React.FC<BreachCardProps> = ({ breach }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getDataClassColor = (dataClass: string) => {
    const critical = ['Passwords', 'Credit cards', 'Bank account numbers', 'Social security numbers'];
    const sensitive = ['Email addresses', 'Phone numbers', 'Names', 'Usernames'];
    
    if (critical.some(item => dataClass.toLowerCase().includes(item.toLowerCase()))) {
      return 'bg-danger-100 text-danger-800';
    } else if (sensitive.some(item => dataClass.toLowerCase().includes(item.toLowerCase()))) {
      return 'bg-warning-100 text-warning-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="breach-card">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{breach.title}</h3>
          <p className="text-sm text-gray-600">{breach.domain}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <Users className="w-4 h-4 mr-1" />
            {formatNumber(breach.pwnCount)} accounts
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(breach.breachDate)}
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{breach.description}</p>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-1" />
          Data Exposed
        </h4>
        <div className="flex flex-wrap gap-2">
          {breach.dataClasses.map((dataClass, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-medium ${getDataClassColor(dataClass)}`}
            >
              {dataClass}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreachCard;
