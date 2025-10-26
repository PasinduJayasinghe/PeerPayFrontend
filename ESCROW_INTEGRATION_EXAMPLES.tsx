// Example: How to integrate EscrowDeposit into ManageApplications component

import React, { useState } from 'react';
import EscrowDeposit from '../wallet/EscrowDeposit';

const ManageApplications = () => {
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // When employer clicks "Accept" on an application
  const handleAcceptApplication = async (application) => {
    try {
      // 1. Update application status to "Accepted"
      await jobService.updateApplicationStatus(application.applicationId, 'Accepted');
      
      // 2. Open escrow deposit modal
      setSelectedApplication(application);
      setShowEscrowModal(true);
      
    } catch (error) {
      toast.error('Failed to accept application');
    }
  };

  // After successful escrow deposit
  const handleEscrowSuccess = async () => {
    try {
      // Update job status to "In Progress"
      await jobService.updateJobStatus(selectedApplication.jobId, 'InProgress');
      
      // Send notification to student
      toast.success('Application accepted and payment secured!');
      
      // Refresh applications list
      fetchApplications();
      
    } catch (error) {
      toast.error('Job update failed');
    }
  };

  return (
    <div>
      {/* Application list */}
      {applications.map(app => (
        <div key={app.applicationId}>
          <button onClick={() => handleAcceptApplication(app)}>
            Accept Application
          </button>
        </div>
      ))}

      {/* Escrow Deposit Modal */}
      {showEscrowModal && selectedApplication && (
        <EscrowDeposit
          isOpen={showEscrowModal}
          onClose={() => setShowEscrowModal(false)}
          jobId={selectedApplication.jobId}
          jobTitle={selectedApplication.jobTitle}
          jobAmount={selectedApplication.jobPayment}
          employerId={user.userId}
          studentId={selectedApplication.studentId}
          studentName={selectedApplication.studentName}
          onSuccess={handleEscrowSuccess}
        />
      )}
    </div>
  );
};

// Example: How to integrate EscrowRelease into JobDetailsView component

import React, { useState, useEffect } from 'react';
import EscrowRelease from '../wallet/EscrowRelease';

const JobDetailsView = () => {
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [escrow, setEscrow] = useState(null);

  // Fetch escrow details when job loads
  useEffect(() => {
    const fetchEscrow = async () => {
      try {
        const escrowData = await escrowService.getEscrowByJob(jobId);
        setEscrow(escrowData);
      } catch (error) {
        console.log('No escrow found for this job');
      }
    };
    fetchEscrow();
  }, [jobId]);

  // After successful release
  const handleReleaseSuccess = async () => {
    try {
      // Update job status to "Completed"
      await jobService.updateJobStatus(jobId, 'Completed');
      
      // Send notification to student
      toast.success('Payment released to student!');
      
      // Refresh job details
      fetchJobDetails();
      
    } catch (error) {
      toast.error('Job update failed');
    }
  };

  return (
    <div>
      {/* Job details */}
      
      {/* Show escrow status */}
      {escrow && (
        <div className="bg-orange-100 p-4 rounded-lg mb-4">
          <p className="font-semibold">Escrow Status: {escrow.status}</p>
          <p>Amount Held: ${escrow.amount}</p>
          <p>Student Will Receive: ${escrow.studentAmount}</p>
        </div>
      )}

      {/* Release button (only if job completed and escrow held) */}
      {job.status === 'Completed' && escrow?.status === 'Held' && (
        <button 
          onClick={() => setShowReleaseModal(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Release Payment to Student
        </button>
      )}

      {/* Escrow Release Modal */}
      {showReleaseModal && escrow && (
        <EscrowRelease
          isOpen={showReleaseModal}
          onClose={() => setShowReleaseModal(false)}
          escrowId={escrow.escrowId}
          jobTitle={job.title}
          studentName={job.studentName}
          amount={escrow.amount}
          platformFee={escrow.platformFee}
          studentId={escrow.studentId}
          onSuccess={handleReleaseSuccess}
        />
      )}
    </div>
  );
};

// Example: Add wallet link to dashboard navigation

import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

// In StudentDashboard or EmployerDashboard navigation:
<Link 
  to="/wallet"
  className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 rounded-lg"
>
  <Wallet className="w-5 h-5 text-purple-600" />
  <span className="font-medium">My Wallet</span>
</Link>

// Example: Show wallet balance in dashboard header

import { useEffect, useState } from 'react';
import { escrowService } from '../../services/escrowService';

const StudentDashboard = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const data = await escrowService.getWalletBalance(user.userId);
      setBalance(data);
    };
    fetchBalance();
  }, [user.userId]);

  return (
    <div>
      {/* Dashboard header with balance */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Available Balance</p>
            <p className="text-3xl font-bold text-green-600">
              ${balance?.availableBalance.toFixed(2) || '0.00'}
            </p>
            <Link to="/wallet" className="text-sm text-purple-600 hover:underline">
              View Wallet →
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard stats including escrow */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="In Escrow"
          value={`$${balance?.escrowedBalance.toFixed(2) || '0.00'}`}
          icon={<Clock />}
          color="orange"
        />
        {/* Other stats */}
      </div>
    </div>
  );
};
