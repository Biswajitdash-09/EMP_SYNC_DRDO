import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCompanyPolicies } from '@/hooks/useCompanyPolicies';
import { useHRData } from '@/hooks/useHRData';
import { useToast } from "@/hooks/use-toast";
import HRManagementHeader from '@/components/hr/HRManagementHeader';
import PoliciesTab from '@/components/hr/tabs/PoliciesTab';
import OrganizationTab from '@/components/hr/tabs/OrganizationTab';
import OnboardingTab from '@/components/hr/tabs/OnboardingTab';
import AnnouncementsTab from '@/components/hr/tabs/AnnouncementsTab';
import AccessControlTab from '@/components/hr/tabs/AccessControlTab';
import PolicyModal from '@/components/hr/PolicyModal';
import AnnouncementModal from '@/components/hr/AnnouncementModal';
import OrganizationModal from '@/components/hr/OrganizationModal';
import OnboardingModal from '@/components/hr/OnboardingModal';
import AccessControlModal from '@/components/hr/AccessControlModal';

const HRManagement = () => {
  const { toast } = useToast();
  
  // Using the new Supabase hook for policies
  const {
    policies,
    loading: policiesLoading,
    addPolicy,
    updatePolicy,
    deletePolicy,
    searchPolicies,
    filterPolicies,
    refetch: refetchPolicies
  } = useCompanyPolicies();

  // Keep existing announcements hook for other sections
  const {
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
  } = useHRData();

  // Modal states
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [organizationModalOpen, setOrganizationModalOpen] = useState(false);
  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false);
  const [accessControlModalOpen, setAccessControlModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy);
    setPolicyModalOpen(true);
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setAnnouncementModalOpen(true);
  };

  const handleDeletePolicy = async (policyId) => {
    await deletePolicy(policyId);
  };

  const handleDeleteAnnouncement = (announcementId) => {
    deleteAnnouncement(announcementId);
    toast({
      title: "Announcement Deleted",
      description: "The announcement has been successfully deleted."
    });
  };

  const handleResetFilters = () => {
    refetchPolicies();
  };

  const closeModals = () => {
    setPolicyModalOpen(false);
    setAnnouncementModalOpen(false);
    setOrganizationModalOpen(false);
    setOnboardingModalOpen(false);
    setAccessControlModalOpen(false);
    setEditingPolicy(null);
    setEditingAnnouncement(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HRManagementHeader onNewPolicy={() => setPolicyModalOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="policies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="structure">Organization</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
          </TabsList>

          <TabsContent value="policies" className="space-y-6">
            <PoliciesTab
              policies={policies}
              loading={policiesLoading}
              onSearch={searchPolicies}
              onFilter={filterPolicies}
              onReset={handleResetFilters}
              onEditPolicy={handleEditPolicy}
              onDeletePolicy={handleDeletePolicy}
            />
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <OrganizationTab onUpdateOrganization={() => setOrganizationModalOpen(true)} />
          </TabsContent>

          <TabsContent value="onboarding" className="space-y-6">
            <OnboardingTab onManageWorkflows={() => setOnboardingModalOpen(true)} />
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <AnnouncementsTab
              announcements={announcements}
              onEditAnnouncement={handleEditAnnouncement}
              onDeleteAnnouncement={handleDeleteAnnouncement}
              onCreateAnnouncement={() => setAnnouncementModalOpen(true)}
            />
          </TabsContent>

          <TabsContent value="access" className="space-y-6">
            <AccessControlTab onEditAccess={() => setAccessControlModalOpen(true)} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <PolicyModal 
        isOpen={policyModalOpen} 
        onClose={closeModals} 
        onSave={editingPolicy ? updatePolicy : addPolicy} 
        policy={editingPolicy} 
      />

      <AnnouncementModal 
        isOpen={announcementModalOpen} 
        onClose={closeModals} 
        onSave={editingAnnouncement ? updateAnnouncement : addAnnouncement} 
        announcement={editingAnnouncement} 
      />

      <OrganizationModal isOpen={organizationModalOpen} onClose={closeModals} />

      <OnboardingModal isOpen={onboardingModalOpen} onClose={closeModals} />

      <AccessControlModal isOpen={accessControlModalOpen} onClose={closeModals} />
    </div>
  );
};

export default HRManagement;
