export interface QuickActionConfig {
    meetingTitle?: string;
    meetingDuration?: number; // in minutes
    meetingDescription?: string;
    emailSubject?: string;
    emailBody?: string;
    defaultLocation?: string;
    onMapView?: () => void; // Custom map view handler
  }

  export interface QuickActionsProps {
    config?: QuickActionConfig;
    className?: string;
  }


  export interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
  }