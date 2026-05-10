// "use client";
import { AddServiceProviderForm } from "@/components/superadmin/serviceprovider/AddUserForm";
// export default function AddServiceProviderPage() {
//   return <AddServiceProviderForm />;
// }

import React from 'react'

const page = () => {
  return (
    <div style={{
      borderRadius: "25px",
      borderTop: "1px solid #E5E7EB",
      borderBottom: "1px solid #E5E7EB",
      borderLeft: "1px solid #E5E7EB",
      padding: "20px",
      // borderRight: "none" // لا تضيف border لليمين
    }}>
      <AddServiceProviderForm />
    </div>
  )
}

export default page
