import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Activity, DollarSign, Bell } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getCurrentUser } from "@/services/AuthService";
import useAuth from "@/auth/auth";
import type UserData from "@/models/UserData";
import toast from "react-hot-toast";

const dummyStats = [
  { title: "Total Users", value: "1,240", icon: Users },
  { title: "Active Today", value: "320", icon: Activity },
  { title: "Revenue", value: "$5,430", icon: DollarSign },
  { title: "Notifications", value: "18", icon: Bell },
];

const chartData = [
  { name: "Mon", users: 200 },
  { name: "Tue", users: 400 },
  { name: "Wed", users: 300 },
  { name: "Thu", users: 500 },
  { name: "Fri", users: 450 },
  { name: "Sat", users: 600 },
  { name: "Sun", users: 700 },
];

const UserHome = () => {
  const user = useAuth((s) => s.user);
  const [user1, setUser1] = useState<UserData | null>(null);
  const getUserData = async () => {
    try {
      const res = await getCurrentUser(user?.email);
      setUser1(res);
      toast.success("You are able to access secure api's");
    } catch (error) {
      console.log(error);
      toast.error("Error in getting data");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl font-semibold"
      >
        User Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dummyStats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-2xl shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">{item.title}</p>
                  <p className="text-xl font-bold">{item.value}</p>
                </div>
                <item.icon className="w-6 h-6 opacity-60" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="rounded-2xl shadow">
        <CardContent className="p-4">
          <h2 className="text-lg font-medium mb-4">Weekly Users</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-2xl shadow">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button className="rounded-2xl">Add User</Button>
              <Button className="rounded-2xl">View Reports</Button>
              <Button className="rounded-2xl">Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Recent Activity</h3>
            <ul className="text-sm space-y-1 opacity-80">
              <li>New user registered</li>
              <li>Password updated</li>
              <li>Profile viewed</li>
              <li>Dummy login detected</li>
            </ul>
          </CardContent>
        </Card>
        <div>
          <Button onClick={getUserData}>Get current user</Button>
          <p>{user1?.name}</p>
        </div>
      </div>
    </div>
  );
};
export default UserHome;
