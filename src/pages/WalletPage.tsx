import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WalletBalance from '../components/wallet/WalletBalance';
import TransactionHistory from '../components/wallet/TransactionHistory';

const WalletPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please log in to view your wallet</p>
      </div>
    );
  }

  const userRole = user.userType?.toLowerCase() === 'student' ? 'student' : 'employer';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wallet</h1>
              <p className="text-gray-600">
                Manage your earnings, escrow, and transactions
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="mb-8">
          <WalletBalance userId={user.userId} userRole={userRole} />
        </div>

        {/* Transaction History */}
        <TransactionHistory userId={user.userId} />
      </div>

      {/* Withdraw Modal (placeholder) */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Withdraw Funds</h2>
            <p className="text-gray-600 mb-6">Withdrawal feature coming soon!</p>
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
