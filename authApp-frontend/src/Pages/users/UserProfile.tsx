import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, User, Calendar, Shield } from "lucide-react";
import { motion } from "framer-motion";

const UserProfile = () => {
  // Dummy user data
  const user = {
    name: "Dev Dhanak",
    email: "dev@example.com",
    role: "USER",
    joined: "12 March 2025",
    image: "https://i.pravatar.cc/300",
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-background via-background to-muted dark:from-black dark:via-neutral-950 dark:to-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-1">User Profile</h1>
        <p className="text-muted-foreground mb-6">
          Manage and view your account information
        </p>

        <Card className="border-border bg-card/60 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* ===== IMAGE SECTION ===== */}
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-32 w-32 border-2 border-primary/30">
                  <AvatarImage src={user.image} />
                  <AvatarFallback className="text-2xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              </div>

              {/* ===== DETAILS SECTION ===== */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <Card className="p-4 bg-background/40">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-background/40">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-background/40">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Role</p>
                      <p className="font-medium">{user.role}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-background/40">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Joined</p>
                      <p className="font-medium">{user.joined}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="outline">Edit Profile</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserProfile;
