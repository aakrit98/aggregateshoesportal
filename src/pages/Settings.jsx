import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Frontend developer with 5 years of experience in React and modern JavaScript.",
    avatar: null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    monthlyNewsletter: true,
    productUpdates: true,
    securityAlerts: true,
  });

  const [appearance, setAppearance] = useState({
    theme: "light",
    compactMode: false,
    fontSize: "medium",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: "", type: "" });

  // Handle notification toggle
  const handleNotificationToggle = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  // Handle appearance change
  const handleAppearanceChange = (setting, value) => {
    setAppearance({
      ...appearance,
      [setting]: value,
    });
  };

  // Save notification settings
  const saveNotificationSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage({
        text: "Notification settings updated!",
        type: "success",
      });
      setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
    }, 1000);
  };

  // Save appearance settings
  const saveAppearanceSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage({ text: "Appearance settings updated!", type: "success" });
      setTimeout(() => setSaveMessage({ text: "", type: "" }), 3000);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {["profile", "password", "notifications", "appearance"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === tab
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </nav>
          </div>

          <div className="p-6">
            {/* Success/Error Message */}
            {saveMessage.text && (
              <div
                className={`mb-4 p-4 rounded-md ${
                  saveMessage.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {saveMessage.text}
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div>
                <div className="space-y-6">
                  {Object.keys(notificationSettings).map((setting) => (
                    <div
                      className="flex items-center justify-between"
                      key={setting}
                    >
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {setting.replace(/([A-Z])/g, " $1").trim()}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Enable or disable{" "}
                          {setting.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle(setting)}
                        className={`${
                          notificationSettings[setting]
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors`}
                      >
                        <span
                          className={`${
                            notificationSettings[setting]
                              ? "translate-x-5"
                              : "translate-x-0"
                          } inline-block h-5 w-5 transform rounded-full bg-white transition`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={saveNotificationSettings}
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Theme
                    </label>
                    <select
                      value={appearance.theme}
                      onChange={(e) =>
                        handleAppearanceChange("theme", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Font Size
                    </label>
                    <select
                      value={appearance.fontSize}
                      onChange={(e) =>
                        handleAppearanceChange("fontSize", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      Compact Mode
                    </h3>
                    <button
                      onClick={() =>
                        handleAppearanceChange(
                          "compactMode",
                          !appearance.compactMode
                        )
                      }
                      className={`${
                        appearance.compactMode ? "bg-blue-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors`}
                    >
                      <span
                        className={`${
                          appearance.compactMode
                            ? "translate-x-5"
                            : "translate-x-0"
                        } inline-block h-5 w-5 transform rounded-full bg-white transition`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={saveAppearanceSettings}
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
