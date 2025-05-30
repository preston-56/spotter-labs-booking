import { useState } from 'react';
import { QuickActionConfig } from '@/types';

export function useQuickActions(config: QuickActionConfig = {}) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAddToCalendar = async (customConfig?: Partial<QuickActionConfig>) => {
    setIsLoading('calendar');

    try {
      const eventConfig = { ...config, ...customConfig };
      const event = {
        title: eventConfig.meetingTitle || "Scheduled Spotter Labs Meeting",
        start: new Date(),
        end: new Date(Date.now() + (eventConfig.meetingDuration || 60) * 60 * 1000),
        description: eventConfig.meetingDescription || "Spotter Labs"
      };

      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Booking System//EN
BEGIN:VEVENT
UID:${Date.now()}@bookingsystem.com
DTSTAMP:${formatDateForICS(new Date())}
DTSTART:${formatDateForICS(event.start)}
DTEND:${formatDateForICS(event.end)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${event.title.toLowerCase().replace(/\s+/g, '-')}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating calendar event:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleInviteColleague = async (customConfig?: Partial<QuickActionConfig>) => {
    setIsLoading('invite');

    try {
      const emailConfig = { ...config, ...customConfig };
      const subject = encodeURIComponent(
        emailConfig.emailSubject || "Meeting Invitation"
      );
      const body = encodeURIComponent(
        emailConfig.emailBody ||
        `Hello,\n\nYou're invited to a meeting.\n\nDetails:\n- Date: ${new Date().toLocaleDateString()}\n- Time: ${new Date().toLocaleTimeString()}\n\nPlease let me know if you can attend.\n\nBest regards`
      );

      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } catch (error) {
      console.error('Error opening email client:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleViewOnMap = async (customConfig?: Partial<QuickActionConfig>) => {
    setIsLoading('map');

    try {
      const mapConfig = { ...config, ...customConfig };

      if (mapConfig.onMapView) {
        // custom map view handler
        mapConfig.onMapView();
      }
    } catch (error) {
      console.error('Error opening map:', error);
    } finally {
      setIsLoading(null);
    }
  };

  return {
    handleAddToCalendar,
    handleInviteColleague,
    handleViewOnMap,
    isLoading
  };
}

// Helper function
function formatDateForICS(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}