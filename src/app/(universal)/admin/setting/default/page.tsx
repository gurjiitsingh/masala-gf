"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { settingSchemaType } from "@/lib/types/settingType";
import { addNewsetting } from "@/app/(universal)/action/setting/dbOperations";
import { createTempDir } from "@/app/(universal)/action/setting/createDir";
import InitialCurrencyLocaleSetup from "../components/InitialCurrencyLocaleSetup";

const DEFAULT_SETTINGS: settingSchemaType[] = [
  { name: "home_page_offer", value: " " },
  { name: "offer_instruction", value: " " },
];

const Page = () => {
  const [initialized, setInitialized] = useState(false);
  const [folderMsg, setFolderMsg] = useState("");
  const [installMsg, setInstallMsg] = useState("");
  const router = useRouter();

  async function handleInstallDefaults() {
    for (const setting of DEFAULT_SETTINGS) {
      const formData = new FormData();
      formData.append("name", setting.name);
      formData.append("value", setting.value!);
      await addNewsetting(formData);
    }
    setInitialized(true);
    setInstallMsg("✅ Default settings installed successfully.");
  }

  async function handleCreateFolder() {
    const result = await createTempDir();
    setFolderMsg(result.message);
  }

  return (
    <div className="p-6 space-y-6">
      {/* 🔙 Back Button */}
      <div>
        <button
          type="button"
          onClick={() => router.push("/admin/setting/")}
          className="form-btn-style bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          🔙 Back to Settings
        </button>
      </div>

      <h1 className="text-2xl font-bold">⚙️ Initial Setup</h1>

      {/* ⚙️ Install Default Settings */}

<InitialCurrencyLocaleSetup />

      <div>
        <button
          type="button"
          onClick={handleInstallDefaults}
          className="form-btn-style bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ⚙️ Install Default Settings
        </button>
        {installMsg && (
          <p className="mt-2 text-green-600">{installMsg}</p>
        )}
      </div>

      {/* 📁 Create Temp Folder */}
      <div>
        <h2 className="text-xl font-bold mb-2">📁 Create Temp Folder</h2>
        <button
          type="button"
          onClick={handleCreateFolder}
          className="form-btn-style bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📁 Create temp folder
        </button>
        {folderMsg && <p className="mt-2 text-green-600">{folderMsg}</p>}
      </div>

      
    </div>
  );
};

export default Page;
