import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Globe,
  Zap,
  ArrowRight,
  MessageCircle,
  Languages,
  Sparkles,
  Check,
} from "lucide-react"

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <motion.div
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(30deg,var(--tw-gradient-stops))] from-primary-200/20 via-secondary-200/20 to-accent-200/20" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 40%)",
            }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 mb-8"
            >
              <Sparkles size={16} className="mr-2" />
              <span className="text-sm font-medium">
                Breaking Language Barriers
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              Connect Globally,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                Chat Naturally
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Experience real-time translation across multiple languages. Chat
              with anyone, anywhere, in your preferred language while they read
              in theirs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/chat"
                className="group inline-flex items-center px-8 py-4 rounded-full bg-primary-500 text-white font-semibold text-lg hover:bg-primary-600 transition-all duration-200 transform hover:scale-105"
              >
                Start Chatting Free
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-700 font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100 rounded-2xl bg-white/50 backdrop-blur-sm p-8 shadow-lg">
            {[
              { label: "Active Users", value: "10K+" },
              { label: "Languages", value: "5+" },
              { label: "Messages/Day", value: "50K+" },
              { label: "Countries", value: "20+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Features that Make Us Special
            </motion.h2>
            <p className="text-xl text-gray-600">
              Everything you need for seamless multilingual communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Languages className="w-8 h-8" />,
                title: "Smart Language Detection",
                description:
                  "Automatically detects the language you're writing in and handles translation seamlessly.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Real-time Translation",
                description:
                  "Messages are instantly translated to each user's preferred language.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Original Message View",
                description:
                  "Toggle between translated and original messages with a single click.",
                color: "from-orange-500 to-red-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -m-4 p-4 bg-gray-50" />
                <div className="relative p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Start Breaking Language Barriers Today
            </h2>

            <div className="max-w-2xl mx-auto mb-12">
              {[
                "No credit card required",
                "5 languages supported",
                "Unlimited messages",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center text-primary-100 mb-3"
                >
                  <Check size={20} className="mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link
              to="/chat"
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-primary-500 font-semibold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started Now <Zap size={20} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
