import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WalletBalance from '../components/wallet/WalletBalance';
import TransactionHistory from '../components/wallet/TransactionHistory';
import WithdrawFunds from '../components/wallet/WithdrawFunds';

const WalletPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(2500);

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
          <WalletBalance 
            userId={user.userId} 
            userRole={userRole}
            onWithdrawClick={() => setShowWithdrawModal(true)}
          />
        </div>

        {/* Transaction History */}
        <TransactionHistory userId={user.userId} />
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <WithdrawFunds
          isOpen={showWithdrawModal}
          onClose={() => setShowWithdrawModal(false)}
          availableBalance={availableBalance}
          onSuccess={() => {
            // Refresh balance after withdrawal
            window.location.reload();
          }}
        />
      )}
    </div>
  );
};

export default WalletPage;
