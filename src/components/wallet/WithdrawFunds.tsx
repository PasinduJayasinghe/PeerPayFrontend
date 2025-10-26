import React, { useState } from 'react';
import { X, DollarSign, CreditCard, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface WithdrawFundsProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onSuccess?: () => void;
}

const WithdrawFunds: React.FC<WithdrawFundsProps> = ({
  isOpen,
  onClose,
  availableBalance,
  onSuccess,
}) => {
  const [amount, setAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState<'bank' | 'paypal'>('bank');
  const [bankAccount, setBankAccount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount);

    if (!amount || withdrawAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (withdrawAmount > availableBalance) {
      toast.error('Insufficient balance');
      return;
    }

    if (withdrawMethod === 'bank') {
      if (!bankAccount || !accountName || !bankName) {
        toast.error('Please fill in all bank details');
        return;
      }
    }

    try {
      setLoading(true);

      // FOR DEMO VIDEO: Simulate withdrawal
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success(`Successfully withdrew $${withdrawAmount.toFixed(2)}!`);
      toast.info('Funds will be transferred within 2-3 business days');
      onSuccess?.();
      onClose();
      
      // Reset form
      setAmount('');
      setBankAccount('');
      setAccountName('');
      setBankName('');
    } catch (error: any) {
      toast.error('Failed to process withdrawal');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Withdraw Funds</h2>
                <p className="text-green-100 text-sm">Transfer money to your account</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Available Balance */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-green-600">
              ${availableBalance.toFixed(2)}
            </p>
          </div>

          {/* Withdrawal Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Withdrawal Amount *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                step="0.01"
                min="0"
                max={availableBalance}
              />
            </div>
            <button
              onClick={() => setAmount(availableBalance.toString())}
              className="mt-2 text-sm text-green-600 hover:underline"
            >
              Withdraw all available balance
            </button>
          </div>

          {/* Withdrawal Method */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Withdrawal Method *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setWithdrawMethod('bank')}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  withdrawMethod === 'bank'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Building2 className={`w-6 h-6 ${withdrawMethod === 'bank' ? 'text-green-600' : 'text-gray-600'}`} />
                <span className={`font-semibold ${withdrawMethod === 'bank' ? 'text-green-600' : 'text-gray-700'}`}>
                  Bank Transfer
                </span>
              </button>
              <button
                onClick={() => setWithdrawMethod('paypal')}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  withdrawMethod === 'paypal'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <CreditCard className={`w-6 h-6 ${withdrawMethod === 'paypal' ? 'text-green-600' : 'text-gray-600'}`} />
                <span className={`font-semibold ${withdrawMethod === 'paypal' ? 'text-green-600' : 'text-gray-700'}`}>
                  PayPal
                </span>
              </button>
            </div>
          </div>

          {/* Bank Details */}
          {withdrawMethod === 'bank' && (
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bank Name *
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Bank of Ceylon"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="1234567890"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                />
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-2">Processing Time:</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>Bank transfers: 2-3 business days</li>
                  <li>PayPal: 1-2 business days</li>
                  <li>Minimum withdrawal: $10</li>
                  <li>No withdrawal fees</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleWithdraw}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Withdraw ${amount || '0.00'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFunds;
