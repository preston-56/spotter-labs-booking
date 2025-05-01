"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClustersTab from "@/components/admin/clusters-tab";
import FloorsTab from "@/components/admin/floors-tab";
import WorkstationsTab from "@/components/admin/workstations-tab";
import UsersTab from "@/components/admin/users-tab";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="clusters" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
          <TabsTrigger value="clusters">Clusters</TabsTrigger>
          <TabsTrigger value="floors">Floors</TabsTrigger>
          <TabsTrigger value="workstations">Workstations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="clusters" className="space-y-6">
          <ClustersTab />
        </TabsContent>

        <TabsContent value="floors" className="space-y-6">
          <FloorsTab />
        </TabsContent>

        <TabsContent value="workstations" className="space-y-6">
          <WorkstationsTab />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <UsersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}