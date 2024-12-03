export default function ContactPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Contact Me
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
          If you have any questions, feedback, or would like to discuss this project, feel free to reach out to me using the information below. I’d love to hear from you!
        </p>
        <div className="text-center">
          <p className="text-lg font-medium">📧 Email: <a href="mailto:bobdaiss3@gmail.com" className="text-blue-500 hover:underline">bobdaiss3@gmail.com</a></p>
          <p className="text-lg font-medium">📞 Phone: <a href="tel:+660927535850" className="text-blue-500 hover:underline">+66 092 753 5850</a></p>
          <p className="text-lg font-medium">📍 Address: Phuket, Kathu, Prince of Songkla University</p>
        </div>
      </div>
    );
  }
  