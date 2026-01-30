import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Lock, Key, Zap, Users, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted text-foreground">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Secure Authentication <br />
              <span className="text-primary">Built for the Future</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              A modern authentication platform with JWT, OAuth, role-based
              access, and enterprise-grade security — designed for scalability
              and trust.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                View Docs
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-3xl" />
            <Card className="relative rounded-2xl border shadow-xl">
              <CardContent className="p-8 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Auth Flow Preview
                </p>
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-3/4 bg-muted rounded" />
                <div className="h-3 w-1/2 bg-muted rounded" />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build secure, modern authentication systems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full rounded-2xl hover:shadow-lg transition">
                <CardContent className="p-6 space-y-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section className="bg-muted/40">
        <div className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Enterprise‑Grade Security
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built with security-first principles: encrypted tokens, secure
              password hashing, refresh token rotation, and role-based access
              control.
            </p>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li>• JWT & OAuth 2.0</li>
              <li>• RBAC & Permissions</li>
              <li>• Token Expiry & Rotation</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="rounded-2xl shadow-xl">
              <CardContent className="p-10 text-center">
                <ShieldCheck className="h-16 w-16 mx-auto text-primary" />
                <p className="mt-4 font-medium">Trusted Authentication Layer</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="container mx-auto px-6 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Secure Your App?
          </h2>
          <p className="mt-6 text-muted-foreground">
            Integrate our authentication system in minutes and focus on building
            features that matter.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">Start Building</Button>
            <Button size="lg" variant="outline">
              GitHub Repo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="container mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Auth Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "JWT Authentication",
    desc: "Stateless and secure token-based authentication for modern apps.",
    icon: Key,
  },
  {
    title: "OAuth & Social Login",
    desc: "Login with Google, GitHub, and more using OAuth 2.0.",
    icon: Users,
  },
  {
    title: "Role-Based Access",
    desc: "Fine-grained authorization with roles and permissions.",
    icon: Lock,
  },
  {
    title: "High Performance",
    desc: "Optimized for speed and scalability.",
    icon: Zap,
  },
  {
    title: "Biometric Ready",
    desc: "Support for future biometric and passkey-based auth.",
    icon: Fingerprint,
  },
  {
    title: "Secure by Design",
    desc: "Industry best practices baked into every layer.",
    icon: ShieldCheck,
  },
];
