import { Container } from '@/components/Container'

export const metadata = {
  title: 'Skillio Privacy Policy - Charlie Macnamara',
  description: 'Privacy Policy for Skillio, an AAC app designed to help users communicate effectively.',
  robots: {
    index: false,
    follow: false,
  },
}


export default function SkillioPrivacyPolicy() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Skillio Privacy Policy
          </h1>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            Last Updated: October 23, 2025
          </p>
        </header>

        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Introduction
            </h2>
            <div className="space-y-4">
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Skillio is an Augmentative and Alternative Communication (AAC) app designed to help users of all ages communicate effectively and develop skills through customizable word boards, emotion detection games, and text-to-speech capabilities.
              </p>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                This Privacy Policy explains how I collect, use, and protect your information when you use the app. If you don't agree with these terms, please don't use Skillio.
              </p>
              <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg mt-6">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-3">Developer Information:</p>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 list-none space-y-2 pl-0">
                  <li><strong>Name:</strong> Charlie Macnamara</li>
                  <li><strong>Contact:</strong> <a href="mailto:support@charliemacnamara.uk" className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors">support@charliemacnamara.uk</a></li>
                  <li><strong>Website:</strong> <a href="https://charliemacnamara.uk" className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors">https://charliemacnamara.uk</a></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Information I Collect */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Information I Collect
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
                  1. Account & Authentication
                </h3>
                <div className="space-y-4">
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">When you create an account:</p>
                  <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <li><strong>Email address</strong> - For authentication and communication</li>
                    <li><strong>Name</strong> - To personalize your experience</li>
                    <li><strong>Password</strong> - Encrypted and stored by Supabase (not accessible to me)</li>
                    <li><strong>User ID</strong> - A unique identifier</li>
                    <li><strong>Account timestamps</strong> - Creation, updates, terms acceptance</li>
                  </ul>
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400 font-semibold mt-6">Third-Party Sign-In (Google/Apple):</p>
                  <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <li>I receive your email and name from these services</li>
                    <li>Temporary tokens verify your identity</li>
                    <li>I don't store your Google/Apple passwords</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
                  2. App Usage Data
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li><strong>Custom vocabulary</strong> - Words you add to your AAC board</li>
                  <li><strong>Preferences</strong> - Theme, speech settings, etc.</li>
                  <li><strong>Progress</strong> - High scores and achievements</li>
                  <li><strong>Settings</strong> - Audio preferences, notification choices</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
                  3. Camera & Facial Data
                </h3>
                <div className="space-y-4">
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <strong>Emotion Detection Game:</strong><br />
                    The app includes an optional emotion detection game using your camera. Here's what happens:
                  </p>
                  <div>
                    <p className="text-base leading-7 font-semibold text-zinc-800 dark:text-zinc-100 mb-3">What's Collected:</p>
                    <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                      <li>Real-time camera access during gameplay</li>
                      <li>Facial images for emotion recognition</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base leading-7 font-semibold text-zinc-800 dark:text-zinc-100 mb-3">Privacy Protections:</p>
                    <ul className="list-none pl-0 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                      <li>✅ <strong>Never stored</strong> - Images deleted immediately after processing</li>
                      <li>✅ <strong>Metadata stripped</strong> - GPS, timestamps, camera info removed</li>
                      <li>✅ <strong>Downscaled</strong> - Reduced to 256px max to minimize detail</li>
                      <li>✅ <strong>Ephemeral</strong> - Zeroed from memory after use</li>
                      <li>✅ <strong>No training</strong> - Never used to train AI models (Google Vertex AI guarantee)</li>
                      <li>✅ <strong>Minimal transmission</strong> - Only emotion labels returned ("happy", "sad", etc.)</li>
                      <li>✅ <strong>Optional</strong> - Only accessed when you play the emotion game</li>
                      <li>✅ <strong>No advertising</strong> - Never used for ads or profiling</li>
                    </ul>
                  </div>
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <strong>Processing:</strong> Google Cloud Vertex AI (us-central1, United States) with enterprise privacy guarantees.
                  </p>
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <strong>Control:</strong> Deny camera access anytime via device settings.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
                  4. Device & Technical Data
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li><strong>Device ID</strong> - For notifications and subscriptions</li>
                  <li><strong>OS version</strong> - For compatibility</li>
                  <li><strong>App version</strong> - For features and updates</li>
                  <li><strong>Push tokens</strong> - If you enable notifications</li>
                  <li><strong>IP address</strong> - Temporary, for API requests only</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
                  5. Audio
                </h3>
                <div className="space-y-4">
                  <ul className="list-none pl-0 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <li>✅ <strong>Text-to-speech</strong> - Generated offline for words you select</li>
                    <li>❌ <strong>Not recording</strong> - I don't record your voice currently</li>
                  </ul>
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <strong>Future:</strong> Voice analysis for pronunciation practice (will require explicit consent)
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
                  6. Purchases
                </h3>
                <div className="space-y-4">
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">If you subscribe:</p>
                  <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <li><strong>Subscription status</strong> - Active/expired</li>
                    <li><strong>Receipts</strong> - Via App Store/Google Play</li>
                    <li><strong>Transaction IDs</strong> - For support and fraud prevention</li>
                    <li><strong>Product IDs</strong> - What you purchased</li>
                  </ul>
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <strong>Note:</strong> I never see your payment details - handled by Apple/Google.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
                  7. Location
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>Permission may be requested by third-party services</li>
                  <li>I don't actively track or use your location</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How I Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              How I Use Your Information
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  App Functionality:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>Account management and authentication</li>
                  <li>Store and sync your custom vocabulary</li>
                  <li>Save preferences and progress</li>
                  <li>Generate speech audio</li>
                  <li>Process emotions for the game</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Service Improvement:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>Debug crashes and issues</li>
                  <li>Optimize performance</li>
                  <li>Develop new features</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Communication:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>Verify your email</li>
                  <li>Password resets</li>
                  <li>Optional push notifications</li>
                  <li>Support responses</li>
                  <li>Service announcements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Subscriptions:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>Process purchases</li>
                  <li>Manage premium access</li>
                  <li>Handle refunds</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Legal Compliance:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>Follow applicable laws</li>
                  <li>Respond to legal requests</li>
                  <li>Enforce Terms of Service</li>
                </ul>
              </div>
            </div>
          </section>

          {/* What I DON'T Do */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              What I DON'T Do
            </h2>
            <ul className="list-none pl-0 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              <li>❌ Sell your data</li>
              <li>❌ Use facial data for advertising</li>
              <li>❌ Train AI models on your images</li>
              <li>❌ Track you across apps</li>
              <li>❌ Share with data brokers</li>
              <li>❌ Behavioral advertising</li>
              <li>❌ Profile children</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Third-Party Services
            </h2>
            <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400 mb-6">
              I use trusted services to provide functionality:
            </p>

            <div className="space-y-3">
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-lg">
                <p className="font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Supabase (Authentication & Database)</p>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 mb-2">Email, name, vocabulary, preferences</p>
                <a href="https://supabase.com/privacy" className="text-sm text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors break-all">https://supabase.com/privacy</a>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-lg">
                <p className="font-semibold text-zinc-800 dark:text-zinc-100 mb-2">PowerSync (Data Sync)</p>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 mb-2">Syncs data between devices</p>
                <a href="https://www.powersync.com/legal/privacy-policy" className="text-sm text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors break-all">https://www.powersync.com/legal/privacy-policy</a>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-lg">
                <p className="font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Google Cloud/Firebase (AI Processing)</p>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 mb-1">Emotion detection via Vertex AI</p>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 mb-2">Images discarded immediately</p>
                <a href="https://cloud.google.com/terms/cloud-privacy-notice" className="text-sm text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors break-all">https://cloud.google.com/terms/cloud-privacy-notice</a>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-lg">
                <p className="font-semibold text-zinc-800 dark:text-zinc-100 mb-2">RevenueCat (Subscriptions)</p>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 mb-2">Purchase management</p>
                <a href="https://www.revenuecat.com/privacy" className="text-sm text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors break-all">https://www.revenuecat.com/privacy</a>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-lg">
                <p className="font-semibold text-zinc-800 dark:text-zinc-100 mb-2">OneSignal (Notifications)</p>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 mb-2">Push notifications (opt-in)</p>
                <a href="https://onesignal.com/privacy_policy" className="text-sm text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors break-all">https://onesignal.com/privacy_policy</a>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-lg">
                <p className="font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Google Sign-In</p>
                <a href="https://policies.google.com/privacy" className="text-sm text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors break-all">https://policies.google.com/privacy</a>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-lg">
                <p className="font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Sign in with Apple</p>
                <a href="https://www.apple.com/legal/privacy/" className="text-sm text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors break-all">https://www.apple.com/legal/privacy/</a>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Children's Privacy
            </h2>
            <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400 mb-8">
              Skillio is for all ages, including children. I comply with COPPA and GDPR.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Protections:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>Minimal data collection</li>
                  <li>No targeted advertising</li>
                  <li>No profiling</li>
                  <li>Facial images immediately deleted</li>
                  <li>No third-party sharing (except necessary services)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Parental Rights:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>Review your child's data</li>
                  <li>Request deletion</li>
                  <li>Refuse further collection</li>
                  <li>Withdraw consent anytime</li>
                </ul>
                <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400 mt-4">
                  <strong>Contact:</strong> <a href="mailto:support@charliemacnamara.uk" className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors">support@charliemacnamara.uk</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Data from Children:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>Email (with parental supervision)</li>
                  <li>Name</li>
                  <li>Custom vocabulary</li>
                  <li>Progress/scores</li>
                  <li>Device IDs</li>
                  <li>Facial images (emotion game only, immediately discarded)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  NOT Collected:
                </h3>
                <ul className="list-none pl-0 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>❌ Government IDs</li>
                  <li>❌ Precise location</li>
                  <li>❌ Stored photos/videos</li>
                  <li>❌ Biometric IDs</li>
                  <li>❌ Audio recordings (currently)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Data Security
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Protections:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>HTTPS/TLS encryption</li>
                  <li>Encrypted local storage</li>
                  <li>Hashed passwords</li>
                  <li>Secure JWT authentication</li>
                  <li>Access controls</li>
                  <li>Regular updates</li>
                </ul>
              </div>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                <strong>Limitation:</strong> No system is 100% secure, but I maintain high standards.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Your Rights
            </h2>
            <div className="space-y-6">
              <ul className="list-disc pl-6 space-y-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                <li><strong>Access:</strong> View your data in app settings</li>
                <li>
                  <strong>Delete:</strong> Email <a href="mailto:support@charliemacnamara.uk" className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors">support@charliemacnamara.uk</a> to delete your account (processed within 30 days)
                  <br />
                  <span className="text-sm italic">In-app deletion coming soon</span>
                </li>
                <li><strong>Update:</strong> Change your info in app settings</li>
              </ul>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Opt-Out:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li><strong>Push notifications:</strong> Device or app settings</li>
                  <li><strong>Emails:</strong> Contact me</li>
                  <li><strong>In-app messages:</strong> OneSignal settings</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Revoke Permissions:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li><strong>iOS:</strong> Settings → Skillio → Permissions</li>
                  <li><strong>Android:</strong> Settings → Apps → Skillio → Permissions</li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <strong>Data Export:</strong> Request via <a href="mailto:support@charliemacnamara.uk" className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors">support@charliemacnamara.uk</a>
                  <br />
                  <span className="text-sm italic">In-app export coming soon</span>
                </p>

                <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <strong>Withdraw Consent:</strong> Delete account or revoke permissions
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Data Retention
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              <li><strong>Active accounts:</strong> Retained while active</li>
              <li><strong>Deleted accounts:</strong> Removed within 30 days</li>
              <li><strong>Facial images:</strong> Deleted immediately (no storage)</li>
              <li><strong>Purchases:</strong> 7 years (legal requirement)</li>
              <li><strong>Crash logs:</strong> 90 days</li>
              <li><strong>Anonymized stats:</strong> May retain indefinitely</li>
            </ul>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              International Transfers
            </h2>
            <div className="space-y-4">
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Your data may be processed in:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                <li><strong>United States</strong> - Primary infrastructure (Supabase, Google Cloud)</li>
                <li><strong>European Union</strong> - Some services</li>
              </ul>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                I comply with GDPR and CCPA requirements.
              </p>
            </div>
          </section>

          {/* Regional Rights */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Regional Rights
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
                  EU Residents (GDPR)
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-base leading-7 font-semibold text-zinc-800 dark:text-zinc-100 mb-3">Rights:</p>
                    <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                      <li>Access, rectify, erase, restrict, port, object</li>
                      <li>Withdraw consent</li>
                      <li>Lodge complaint with supervisory authority</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base leading-7 font-semibold text-zinc-800 dark:text-zinc-100 mb-3">Legal Basis:</p>
                    <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                      <li>Contract performance</li>
                      <li>Consent (optional features)</li>
                      <li>Legitimate interests (improvement, security)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
                  California Residents (CCPA)
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-base leading-7 font-semibold text-zinc-800 dark:text-zinc-100 mb-3">Rights:</p>
                    <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                      <li>Know what I collect</li>
                      <li>Request deletion</li>
                      <li>Opt-out of sales (I don't sell data)</li>
                      <li>Non-discrimination</li>
                    </ul>
                  </div>
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <strong>Note:</strong> I don't sell personal information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tracking */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Tracking
            </h2>
            <div className="space-y-4">
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                As a native app, I don't use cookies. I use:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                <li><strong>Device IDs</strong> (notifications, subscriptions)</li>
                <li><strong>Local storage</strong> (preferences)</li>
                <li><strong>Session tokens</strong> (authentication)</li>
              </ul>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                RevenueCat may use Apple's Ad Services Attribution (anonymous, iOS only).
              </p>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                No third-party advertising or cross-app tracking.
              </p>
            </div>
          </section>

          {/* Future Features */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Future Features
            </h2>
            <div className="space-y-4">
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Planned additions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                <li>Voice analysis (pronunciation practice)</li>
                <li>New games</li>
                <li>Optional sharing with therapists/family</li>
              </ul>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                <strong>Promise:</strong> I'll update this policy and notify you before collecting new data types.
              </p>
            </div>
          </section>

          {/* Policy Changes */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Policy Changes
            </h2>
            <div className="space-y-4">
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                I may update this policy. When I do:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                <li>Update "Last Updated" date</li>
                <li>Notify you of material changes</li>
                <li>Your continued use means acceptance</li>
                <li>Review periodically</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Contact
            </h2>
            <div className="space-y-4">
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Questions or requests:
              </p>
              <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
                <ul className="text-base leading-7 text-zinc-600 dark:text-zinc-400 list-none space-y-2 pl-0">
                  <li><strong>Email:</strong> <a href="mailto:support@charliemacnamara.uk" className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors">support@charliemacnamara.uk</a></li>
                  <li><strong>Developer:</strong> Charlie Macnamara</li>
                  <li><strong>Website:</strong> <a href="https://charliemacnamara.uk" className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors">https://charliemacnamara.uk</a></li>
                  <li><strong>Response time:</strong> Within 30 days</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Summary */}
          <section className="bg-teal-50 dark:bg-teal-900/20 p-8 rounded-lg border-l-4 border-teal-500">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Quick Summary
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Collected:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>Email, name (account)</li>
                  <li>Vocabulary, preferences, scores</li>
                  <li>Camera (emotion game only, deleted immediately)</li>
                  <li>Device IDs, purchases</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  NOT Done:
                </h3>
                <ul className="list-none pl-0 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>❌ Sell data</li>
                  <li>❌ Store facial images</li>
                  <li>❌ Advertising use</li>
                  <li>❌ Cross-app tracking</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
                  Your Rights:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <li>Delete account</li>
                  <li>Access data</li>
                  <li>Opt-out</li>
                  <li>Revoke permissions</li>
                </ul>
              </div>

              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400 pt-4">
                <strong>Questions?</strong> <a href="mailto:support@charliemacnamara.uk" className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors">support@charliemacnamara.uk</a>
              </p>
            </div>
          </section>

          <footer className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-700/40">
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 text-center">
              Last updated: October 23, 2025
            </p>
          </footer>
        </div>
      </div>
    </Container>
  )
}
